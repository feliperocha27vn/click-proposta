import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { GetUserByPhoneUseCase } from '@/use-cases/users/get-user-by-phone-use-case'

export function makeGetUserByPhoneUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserByPhoneUseCase = new GetUserByPhoneUseCase(prismaUsersRepository)
  return getUserByPhoneUseCase
}
