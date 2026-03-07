import axios from 'axios'
import { env } from '../env'

export interface SendTextParams {
  instanceName: string
  phone: string
  text: string
}

const evolutionApi = axios.create({
  baseURL: env.EVOLUTION_API_URL,
  headers: {
    apikey: env.EVOLUTION_API_TOKEN,
  },
})

export class MessagingProvider {
  private defaultInstance = 'main'

  async sendMessage(phone: string, text: string): Promise<void> {
    try {
      await evolutionApi.post(`/message/sendText/${this.defaultInstance}`, {
        number: phone,
        text: text,
      })
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message: string }
      console.error(
        `[MessagingProvider] Erro ao enviar mensagem para ${phone}:`,
        err?.response?.data || err.message
      )
    }
  }
}
