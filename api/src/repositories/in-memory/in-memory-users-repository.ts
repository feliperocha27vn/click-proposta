import type { planType, Prisma, User } from '@prisma/client'
import { startOfMonth } from 'date-fns'
import { randomUUID } from 'node:crypto'
import type { UsersRepository } from '../users-respository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  public proposals: any[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID() as any,
      name: data.name ?? null,
      email: data.email,
      password: (data as any).password ?? null,
      phone: data.phone ?? null,
      avatarUrl: data.avatarUrl ?? null,
      cnpj: data.cnpj ?? null,
      address: data.address ?? null,
      plan: (data.plan as planType) ?? 'FREE',
      planType: data.planType ?? 'FREE',
      planExpiresAt: data.planExpiresAt
        ? new Date(data.planExpiresAt as string)
        : null,
      createdAt: new Date(),
      updatedAt: new Date(),
      cpf: null,
      isRegisterComplete: false,
      credits: 2,
    }

    this.items.push(user)
    return user
  }

  async getById(id: string): Promise<User | null> {
    return this.items.find(item => item.id === id) || null
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    return this.items.find(item => item.phone === phone) || null
  }

  async countProposalsInMonth(userId: string): Promise<number> {
    const now = new Date()
    const start = startOfMonth(now)
    return this.proposals.filter(
      p => p.userId === userId && new Date(p.createdAt) >= start
    ).length
  }

  async createNewCostumer(data: any) {
    return {} as any
  }
  async fetchCustomers(userId: string) {
    return []
  }
  async searchByNameAndEmail(userId: string, query: string) {
    return []
  }
  async completeRegister(id: string, data: any) {
    return {} as any
  }
  async getCompleteRegister(id: string) {
    return {} as any
  }
  async getDataForPayment(id: string) {
    return {} as any
  }
  async changePlan(id: string, planType: string, planExpiresAt: Date) {
    return {} as any
  }
  async getByIdBasic(id: string) {
    return this.getById(id)
  }
  async getDataForCreatePdfProduct(userId: string) {
    return this.getById(userId)
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.items.find(item => item.email === email) || null
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const index = this.items.findIndex(item => item.id === id)
    this.items[index] = { ...this.items[index], ...(data as any) }
    return this.items[index]
  }

  async countProposals(userId: string): Promise<number> {
    return this.proposals.filter(p => p.userId === userId).length
  }
}
