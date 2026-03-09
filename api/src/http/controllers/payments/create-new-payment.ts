import { env } from '@/env'
import { makeCreatePaymentUseCase } from '@/factories/payments/make-create-payment-use-case'
import { stripe } from '@/lib/stripe'
import { verifyJwt } from '@/middlewares/verifyJwt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createNewPayment: FastifyPluginAsyncZod = async app => {
  app.post(
    '/payment',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Payments'],
        operationId: 'createNewPayment',
        body: z.object({
          customer: z.object({
            name: z.string().min(3),
            email: z.string().email(),
            cellphone: z.string().min(10).max(11),
            cpf: z.string().min(11).max(14),
          }),
        }),
        response: {
          201: z.string(),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { customer } = request.body

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'brl',
                product_data: {
                  name: 'Plano Pro - Click Proposta',
                  description:
                    'Acesso ilimitado e orçamentos com IA por 30 dias',
                },
                unit_amount: 1490, // R$ 14,90
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          client_reference_id: request.user.sub,
          customer_email: customer.email,
          success_url: `${env.APP_URL}/success-payment`,
          cancel_url: `${env.APP_URL}/dashboard`,
        })

        if (!session.url) {
          throw new Error('Failed to generate Stripe checkout URL')
        }

        const createPaymentUseCase = makeCreatePaymentUseCase()

        await createPaymentUseCase.execute({
          userId: request.user.sub,
          stripeId: session.id,
        })

        return reply.status(201).send(session.url)
      } catch (error: unknown) {
        console.error('Error creating Stripe session:', error)
        return reply.status(500).send({
          message:
            (error as Error).message ||
            'Internal server error during payment creation',
        })
      }
    }
  )
}
