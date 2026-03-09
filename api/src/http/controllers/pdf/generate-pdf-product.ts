import { makeGetDataForCreatePdfProductUseCase } from '@/factories/users/make-get-data-for-create-pdf-product-use-case'
import { prisma } from '@/lib/prisma'
import { verifyJwt } from '@/middlewares/verifyJwt'
import { BudgetPdfProducts } from '@/pdf/templates/budget-pdf-products'
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { renderToStream } from '@react-pdf/renderer'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import React from 'react'
import z from 'zod'

export const generatePdfProduct: FastifyPluginAsyncZod = async app => {
  app.post(
    '/pdf/generate-product',
    {
      onRequest: async (request, reply) => {
        const authHeader = request.headers.authorization
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1]
          if (token === process.env.BOT_SERVICE_TOKEN) {
            return // É o bot, pode passar!
          }
        }
        // Se não for o bot, verifica como usuário normal (JWT)
        return verifyJwt(request, reply)
      },
      schema: {
        tags: ['PDF'],
        operationId: 'generatePdfProduct',
        body: z.object({
          userId: z.string().optional(), // O bot precisará enviar para acharmos os dados
          total: z.string(),
          services: z.array(
            z.object({
              id: z.string().optional(),
              title: z.string(),
              description: z.string().optional(),
              quantity: z.number().nullable().optional(),
              price: z.number().nullable().optional(),
              budgetsId: z.string().nullable().optional(),
            })
          ),
        }),
      },
    },
    async (request, reply) => {
      const { total, services, userId } = request.body

      try {
        const getDataUseCase = makeGetDataForCreatePdfProductUseCase()
        const targetUserId = userId || request.user?.sub

        if (!targetUserId) {
          return reply.status(400).send({ message: 'User ID is required' })
        }

        const { user } = await getDataUseCase.execute({
          userId: targetUserId,
        })

        const normalizedServices = services.map(s => ({
          ...s,
          id: s.id ?? Math.random().toString(),
          description: s.description ?? '',
          budgetsId: s.budgetsId ?? null,
        }))

        // Grava o orçamento no banco para contar no limite do plano
        const authHeader = request.headers.authorization
        const botToken = authHeader?.split(' ')[1]
        if (botToken === process.env.BOT_SERVICE_TOKEN) {
          // Busca ou cria um cliente default para o bot para este usuário
          let customer = await prisma.customers.findFirst({
            where: {
              userId: targetUserId,
              email: `whatsapp-${targetUserId}@clickproposta.com.br`,
            },
          })

          if (!customer) {
            customer = await prisma.customers.create({
              data: {
                name: 'Cliente WhatsApp',
                email: `whatsapp-${targetUserId}@clickproposta.com.br`,
                phone: user.phone || '',
                userId: targetUserId,
              },
            })
          }

          const budget = await prisma.budgets.create({
            data: {
              customersId: customer.id,
              usersId: targetUserId,
              total: Number.parseFloat(total),
              status: 'SENT',
            },
          })

          await prisma.budgetsServices.createMany({
            data: normalizedServices.map(s => ({
              budgetsId: budget.id,
              title: s.title,
              description: s.description || '',
              quantity: s.quantity || 1,
              price: s.price || 0,
            })),
          })

          const usersRepository = new PrismaUsersRepository()
          await usersRepository.createProposalLog(targetUserId, 'BOT', 'BUDGET')
        }

        const pdfDocument = React.createElement(BudgetPdfProducts, {
          phone: user.phone,
          email: user.email,
          cnpj: user.cnpj,
          imgUrl: user.avatarUrl,
          total,
          services: normalizedServices,
          address: user.address,
          // biome-ignore lint/suspicious/noExplicitAny: necessário para compatibilidade com @react-pdf/renderer
        }) as React.ReactElement<any>

        const stream = await renderToStream(pdfDocument)

        reply.header('Content-Type', 'application/pdf')
        reply.header(
          'Content-Disposition',
          'attachment; filename="orcamento-produtos.pdf"'
        )

        return reply.send(stream)
      } catch (error) {
        console.error('Erro ao gerar PDF de produtos:', error)
        reply.status(500).send({
          error: 'Erro ao gerar PDF',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        })
      }
    }
  )
}
