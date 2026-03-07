import type { Payments, Prisma } from '@prisma/client'

export interface PaymentsRepository {
  create(data: Prisma.PaymentsUncheckedCreateInput): Promise<Payments>
  getByStripeId(stripeId: string): Promise<Payments | null>
}
