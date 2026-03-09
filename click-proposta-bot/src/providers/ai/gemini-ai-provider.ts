import { GoogleGenAI } from '@google/genai'
import { env } from '../../env'
import {
  budgetExtractionSchema,
  buildExtractionPrompt,
  type ExtractedItem,
  type GeminiExtractionResponse,
} from '../../lib/gemini-schemas'
import type { AiProvider } from './ai-provider'

export const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
  apiVersion: 'v1beta',
})

export class GeminiAiProvider implements AiProvider {
  private async requestWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries = 3
  ): Promise<T> {
    let lastError: unknown

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error
        const status =
          (error as { status?: number }).status ||
          (error as { response?: { status: number } }).response?.status ||
          ((error as Error).message?.includes('429')
            ? 429
            : (error as Error).message?.includes('503')
              ? 503
              : 0)

        const isRateLimit = status === 429
        const isServiceUnavailable = status === 503 || status === 500

        if (isRateLimit) {
          console.error(
            `[Gemini] Limite de cota atingido (429). Billing necessário no Google AI Studio.`
          )
          throw error
        }

        if (!isServiceUnavailable || attempt === maxRetries) {
          throw error
        }

        const delay = 2000 * 2 ** (attempt - 1)
        console.warn(
          `[Gemini] Tentativa ${attempt} falhou (Status: ${status}). Retentando em ${delay}ms...`
        )
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }

  async extractBudgetItems(
    text: string,
    budgetType: 'product' | 'civil'
  ): Promise<ExtractedItem[]> {
    const prompt = buildExtractionPrompt(text, budgetType)

    try {
      const response = await this.requestWithRetry(() =>
        gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: budgetExtractionSchema,
            temperature: 0,
          },
        })
      )

      const jsonText = response.text

      if (!jsonText) {
        return []
      }

      const parsed = JSON.parse(jsonText) as GeminiExtractionResponse

      console.log(
        `[Gemini] Raciocínio: ${parsed._raciocinio?.substring(0, 120)}...`
      )
      console.log(
        `[Gemini] Extração Sucedida: ${parsed.items?.length ?? 0} itens encontrados em "${text.substring(0, 60)}"`
      )

      return parsed.items ?? []
    } catch (error) {
      const status =
        (error as { status?: number }).status ||
        (error as { response?: { status: number } }).response?.status
      if (status === 429 || (error as Error).message?.includes('429')) {
        console.error(
          '[Gemini] Erro de Cota (429) - O Limite do Free Tier foi atingido.'
        )
      } else {
        console.error('[Gemini] Erro crítico ao extrair itens:', error)
      }
      return []
    }
  }

  async transcribeAudio(
    base64Audio: string,
    mimeType: string
  ): Promise<string> {
    try {
      const response = await this.requestWithRetry(() =>
        gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: 'Transcreva este áudio exatamente como foi falado. Não adicione explicações, comentários ou formatações extras. Apenas o texto transcrito.',
                },
                {
                  inlineData: {
                    data: base64Audio,
                    mimeType: mimeType,
                  },
                },
              ],
            },
          ],
          config: {
            temperature: 0,
          },
        })
      )

      const transcribedText = response.text || ''

      console.log(
        `[Gemini] Áudio transcrito com sucesso: "${transcribedText.substring(0, 60)}..."`
      )

      return transcribedText
    } catch (error) {
      console.error('[Gemini] Erro crítico ao transcrever áudio:', error)
      return ''
    }
  }

  async extractTotalValue(text: string): Promise<number | null> {
    try {
      const response = await this.requestWithRetry(() =>
        gemini.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Extraia o valor monetário total do seguinte texto. 
                  Se o texto disser algo como "20 mil", entenda como 20000. 
                  Retorne APENAS um JSON no formato {"total": number}. 
                  Se não houver valor, retorne {"total": null}.
                  
                  Texto: "${text}"`,
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                total: { type: 'NUMBER' },
              },
            },
            temperature: 0,
          },
        })
      )

      const jsonText = response.text
      if (!jsonText) return null

      const parsed = JSON.parse(jsonText) as { total: number | null }
      console.log(`[Gemini] Valor total extraído: ${parsed.total} de "${text}"`)

      return parsed.total
    } catch (error) {
      console.error('[Gemini] Erro ao extrair valor total:', error)
      return null
    }
  }
}
