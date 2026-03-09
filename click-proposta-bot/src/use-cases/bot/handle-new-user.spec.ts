import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../../lib/axios'
import { InMemorySessionRepository } from '../../repositories/in-memory/in-memory-session-repository'
import { HandleNewUserUseCase } from './handle-new-user'

vi.mock('../../lib/axios')

let sessionRepository: InMemorySessionRepository
let sut: HandleNewUserUseCase

describe('Handle New User Use Case (Bot)', () => {
  beforeEach(() => {
    sessionRepository = new InMemorySessionRepository()
    sut = new HandleNewUserUseCase(sessionRepository)
    vi.clearAllMocks()
  })

  it('should be able to start a new session for a valid user', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          name: 'Felipe',
          phone: '123456789',
          planType: 'FREE',
          countProposalsInMonth: 0,
        },
      },
    })

    const response = await sut.execute({ phone: '123456789' })

    expect(response).toContain('Olá, *Felipe*')
    expect(response).toContain('qual o tipo do seu orçamento?')

    const session = await sessionRepository.getSession('123456789')
    expect(session?.state).toBe('AWAITING_TYPE')
    expect(session?.userId).toBe('user-1')
  })

  it('should block FREE user if limit is reached', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          name: 'Felipe',
          phone: '123456789',
          planType: 'FREE',
          countProposalsInMonth: 2,
        },
      },
    })

    const response = await sut.execute({ phone: '123456789' })

    expect(response).toContain('orçamentos gratuitos deste mês acabaram')
    expect(response).toContain('Plano Pro')
  })

  it('should block PRO user if plan is expired', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          name: 'Felipe',
          phone: '123456789',
          planType: 'PRO',
          planExpiresAt: new Date(Date.now() - 1000 * 60).toISOString(), // expired
          countProposalsInMonth: 10,
        },
      },
    })

    const response = await sut.execute({ phone: '123456789' })

    expect(response).toContain('*Plano Pro* expirou')
  })

  it('should block PRO user if fair use limit is reached', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: {
        user: {
          id: 'user-1',
          name: 'Felipe',
          phone: '123456789',
          planType: 'PRO',
          planExpiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
          countProposalsInMonth: 100,
        },
      },
    })

    const response = await sut.execute({ phone: '123456789' })

    expect(response).toContain('limite de Fair Use (100 orçamentos)')
  })

  it('should return error message if user not found (404)', async () => {
    vi.mocked(api.get).mockRejectedValueOnce({
      response: { status: 404 },
      message: 'Not Found',
    })

    const response = await sut.execute({ phone: '123456789' })

    expect(response).toContain('não encontrei seu número')
  })
})
