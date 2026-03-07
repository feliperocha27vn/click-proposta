import { ExceededPlanProposal } from '@/errors/exceeded-plan-proposal'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryProposalRepository } from '@/repositories/in-memory/in-memory-proposal-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateProposalUseCase } from './create'

let usersRepository: InMemoryUsersRepository
let proposalRepository: InMemoryProposalRepository
let sut: CreateProposalUseCase

describe('Create Proposal Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    proposalRepository = new InMemoryProposalRepository()
    sut = new CreateProposalUseCase(proposalRepository, usersRepository)
  })

  it('should be able to create a proposal', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      planType: 'FREE',
    })

    const { proposal } = await sut.execute({
      userId: user.id,
      title: 'New Proposal',
      customersId: 'customer-1',
      urlLogoImage: null,
      welcomeDescription: 'Welcome',
      whyUs: 'Why us',
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      discount: 0,
      services: [{ price: 100, servicesId: 'service-1' }],
    })

    expect(proposal.id).toEqual(expect.any(String))
    expect(Number(proposal.totalPrice)).toBe(100)
  })

  it('should not be able to create more than 2 proposals per month in FREE plan', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      planType: 'FREE',
    })

    // Mock 2 proposals in current month
    usersRepository.proposals.push(
      { userId: user.id, createdAt: new Date() },
      { userId: user.id, createdAt: new Date() }
    )

    await expect(() =>
      sut.execute({
        userId: user.id,
        title: 'New Proposal',
        customersId: 'customer-1',
        urlLogoImage: null,
        welcomeDescription: 'Welcome',
        whyUs: 'Why us',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        discount: 0,
        services: [{ price: 100, servicesId: 'service-1' }],
      })
    ).rejects.toBeInstanceOf(ExceededPlanProposal)
  })

  it('should be able to create up to 100 proposals per month in PRO plan', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      planType: 'PRO',
      planExpiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // tomorrow
    })

    // Mock 99 proposals
    for (let i = 0; i < 99; i++) {
      usersRepository.proposals.push({ userId: user.id, createdAt: new Date() })
    }

    const { proposal } = await sut.execute({
      userId: user.id,
      title: 'New Proposal',
      customersId: 'customer-1',
      urlLogoImage: null,
      welcomeDescription: 'Welcome',
      whyUs: 'Why us',
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      discount: 0,
      services: [{ price: 100, servicesId: 'service-1' }],
    })

    expect(proposal.id).toEqual(expect.any(String))
  })

  it('should not be able to create more than 100 proposals per month in PRO plan (Fair Use)', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      planType: 'PRO',
      planExpiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
    })

    // Mock 100 proposals
    for (let i = 0; i < 100; i++) {
      usersRepository.proposals.push({ userId: user.id, createdAt: new Date() })
    }

    await expect(() =>
      sut.execute({
        userId: user.id,
        title: 'New Proposal',
        customersId: 'customer-1',
        urlLogoImage: null,
        welcomeDescription: 'Welcome',
        whyUs: 'Why us',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        discount: 0,
        services: [{ price: 100, servicesId: 'service-1' }],
      })
    ).rejects.toBeInstanceOf(ExceededPlanProposal)
  })

  it('should not be able to create a proposal if PRO plan is expired', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      planType: 'PRO',
      planExpiresAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // yesterday
    })

    await expect(() =>
      sut.execute({
        userId: user.id,
        title: 'New Proposal',
        customersId: 'customer-1',
        urlLogoImage: null,
        welcomeDescription: 'Welcome',
        whyUs: 'Why us',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        discount: 0,
        services: [{ price: 100, servicesId: 'service-1' }],
      })
    ).rejects.toBeInstanceOf(ExceededPlanProposal)
  })

  it('should throw ResourceNotFoundError if user does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-user',
        title: 'New Proposal',
        customersId: 'customer-1',
        urlLogoImage: null,
        welcomeDescription: 'Welcome',
        whyUs: 'Why us',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        discount: 0,
        services: [{ price: 100, servicesId: 'service-1' }],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
