/**
 * Mock do GeminiAiProvider.
 * Evita chamadas reais à API do Gemini durante os testes.
 */
import { vi } from 'vitest'

export const mockExtractBudgetItems = vi.fn().mockResolvedValue([])
export const mockExtractTotalValue = vi.fn().mockResolvedValue(null)
export const mockTranscribeAudio = vi.fn().mockResolvedValue('')

export class MockGeminiAiProvider {
  extractBudgetItems = mockExtractBudgetItems
  extractTotalValue = mockExtractTotalValue
  transcribeAudio = mockTranscribeAudio
}
