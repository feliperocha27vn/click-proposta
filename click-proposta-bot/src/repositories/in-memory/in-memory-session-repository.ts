import type { ChatSession, SessionRepository } from '../session-repository'

export class InMemorySessionRepository implements SessionRepository {
  private sessions = new Map<string, ChatSession>()

  async getSession(phone: string): Promise<ChatSession | null> {
    return this.sessions.get(phone) || null
  }

  async saveSession(
    phone: string,
    session: Partial<ChatSession>
  ): Promise<void> {
    const existing = this.sessions.get(phone) || {
      phone,
      state: 'NEW' as const,
    }
    this.sessions.set(phone, { ...existing, ...session })
  }

  async clearSession(phone: string): Promise<void> {
    this.sessions.delete(phone)
  }
}
