import { ExceededPlanProposal } from '@/errors/exceeded-plan-proposal'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { ProposalRepository } from '@/repositories/proposal-repository'
import type { UsersRepository } from '@/repositories/users-respository'
import type { Proposal } from '@prisma/client'

interface CreateProposalUseCaseRequest {
  urlLogoImage: string | null
  title: string
  customersId: string
  welcomeDescription: string
  whyUs: string
  challenge: string
  solution: string
  services: {
    price: number
    servicesId: string
  }[]
  results: string
  discount: number
  userId: string
}

interface CreateProposalUseCaseReply {
  proposal: Proposal
}

export class CreateProposalUseCase {
  constructor(
    private proposalRepository: ProposalRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    urlLogoImage,
    title,
    customersId,
    welcomeDescription,
    whyUs,
    challenge,
    solution,
    services,
    results,
    discount,
    userId,
  }: CreateProposalUseCaseRequest): Promise<CreateProposalUseCaseReply> {
    const countProposalsInMonth =
      await this.usersRepository.countProposalsInMonth(userId)
    const user = await this.usersRepository.getById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Regra para Plano FREE: Máximo 2 propostas por mês
    if (user.planType === 'FREE' && countProposalsInMonth >= 2) {
      throw new ExceededPlanProposal()
    }

    // Regra para Plano PRO: Máximo 100 propostas por mês (Fair Use) e verificação de expiração
    if (user.planType === 'PRO') {
      if (countProposalsInMonth >= 100) {
        throw new ExceededPlanProposal()
      }

      const now = new Date()
      if (user.planExpiresAt && now > user.planExpiresAt) {
        throw new ExceededPlanProposal() // Ou um erro específico de assinatura expirada
      }
    }

    const subtotal = services.reduce((acc, service) => acc + service.price, 0)
    const discountAmount = (subtotal * discount) / 100
    const totalPrice = subtotal - discountAmount

    const proposal = await this.proposalRepository.create(
      {
        urlLogoImage,
        title,
        customersId,
        welcomeDescription,
        whyUs,
        challenge,
        solution,
        results,
        discount,
        totalPrice,
        userId,
      },
      services
    )

    await this.usersRepository.createProposalLog(userId, 'SITE', 'PROPOSAL')

    return { proposal }
  }
}
