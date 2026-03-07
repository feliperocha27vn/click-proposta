import type { Prisma, Proposal } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import type { ProposalRepository } from '../proposal-repository'

export class InMemoryProposalRepository implements ProposalRepository {
  public items: Proposal[] = []

  async create(data: Prisma.ProposalUncheckedCreateInput): Promise<Proposal> {
    const proposal: Proposal = {
      id: randomUUID() as any,
      urlLogoImage: data.urlLogoImage ?? null,
      title: data.title,
      customersId: data.customersId as any,
      welcomeDescription: data.welcomeDescription ?? null,
      whyUs: data.whyUs ?? null,
      challenge: data.challenge ?? null,
      solution: data.solution ?? null,
      results: data.results ?? null,
      discount: data.discount,
      totalPrice: new Decimal(data.totalPrice as any),
      userId: data.userId as any,
      status: (data.status as any) ?? 'DRAFT',
      createdAt: new Date(),
    }

    this.items.push(proposal)
    return proposal
  }

  async fetchProposalMinimalDetails(userId: string): Promise<any[]> {
    return this.items.filter(item => item.userId === userId)
  }

  async getById(id: string): Promise<any | null> {
    const proposal = this.items.find(item => item.id === id)
    if (!proposal) return null
    return {
      ...proposal,
      customerName: 'Customer',
      services: [],
    }
  }

  async update(
    id: string,
    userId: string,
    data: Prisma.ProposalUncheckedUpdateInput
  ): Promise<void> {
    const index = this.items.findIndex(item => item.id === id)
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...(data as any) }
    }
  }

  async confirmSending(id: string, userId: string) {}
  async approveProposal(id: string) {}
  async recusedProposal(id: string) {}
  async countAcceptedProposalsAndTotalProposals(userId: string) {
    return { accepted: 0, total: this.items.length }
  }
}
