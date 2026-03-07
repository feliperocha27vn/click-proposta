import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { UsersRepository } from '@/repositories/users-respository'

interface GetUserByPhoneUseCaseRequest {
  phone: string
}

interface GetUserByPhoneUseCaseReply {
  user: {
    id: string
    phone: string
    email: string
    avatarUrl: string | null
    cnpj: string | null
    address: string | null
    planType: string
    planExpiresAt: Date | null
    countProposalsInMonth: number
  }
}

export class GetUserByPhoneUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    phone,
  }: GetUserByPhoneUseCaseRequest): Promise<GetUserByPhoneUseCaseReply> {
    const user = await this.usersRepository.getUserByPhone(phone)

    if (!user || !user.id) {
      throw new ResourceNotFoundError()
    }

    const countProposalsInMonth =
      await this.usersRepository.countProposalsInMonth(user.id)

    return {
      user: {
        id: user.id,
        phone: user.phone ?? '',
        email: user.email ?? '',
        avatarUrl: user.avatarUrl ?? '',
        cnpj: user.cnpj ?? '',
        address: user.address ?? '',
        planType: user.planType ?? 'FREE',
        planExpiresAt: user.planExpiresAt ?? null,
        countProposalsInMonth,
      },
    }
  }
}
