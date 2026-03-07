import type { PaymentsRepository } from '@/repositories/payments-repository'

interface CreatePaymentUseCaseRequest {
  userId: string
  stripeId: string
}

export class CreatePaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({ userId, stripeId }: CreatePaymentUseCaseRequest) {
    await this.paymentsRepository.create({
      userId,
      stripeId,
    })
  }
}
