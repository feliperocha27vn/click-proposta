import { PrismaPaymentsRepository } from '@/repositories/prisma/payments-repository'
import { GetByStripeIdPaymentUseCase } from '@/use-cases/payments/get-by-stripe-id'

export function makeGetByStripeIdPaymentUseCase() {
  const prismaPaymentsRepository = new PrismaPaymentsRepository()
  const getByStripeIdPaymentUseCase = new GetByStripeIdPaymentUseCase(
    prismaPaymentsRepository
  )
  return getByStripeIdPaymentUseCase
}
