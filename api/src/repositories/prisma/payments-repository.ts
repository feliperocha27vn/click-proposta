import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { PaymentsRepository } from '../payments-repository'

export class PrismaPaymentsRepository implements PaymentsRepository {
  async create(data: Prisma.PaymentsUncheckedCreateInput) {
    const payment = await prisma.payments.create({
      data,
    })

    return payment
  }

  async getByStripeId(stripeId: string) {
    const payment = await prisma.payments.findUnique({
      where: {
        stripeId: stripeId,
      },
    })

    return payment
  }
}
