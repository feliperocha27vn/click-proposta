import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { PaymentsRepository } from '@/repositories/payments-repository'
import type { Payments } from '@prisma/client'

interface GetByStripeIdPaymentUseCaseRequest {
  stripeId: string
}

interface GetByStripeIdPaymentUseCaseReply {
  payment: Payments
}

export class GetByStripeIdPaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({
    stripeId,
  }: GetByStripeIdPaymentUseCaseRequest): Promise<GetByStripeIdPaymentUseCaseReply> {
    const payment = await this.paymentsRepository.getByStripeId(stripeId)

    if (!payment) {
      throw new ResourceNotFoundError()
    }

    return { payment }
  }
}
