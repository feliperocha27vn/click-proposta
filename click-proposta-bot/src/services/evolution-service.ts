import axios from 'axios'
import { env } from '../env'

// Cliente Axios exclusivo para falar com a Evolution API
const evolutionApi = axios.create({
  baseURL: env.EVOLUTION_API_URL,
  headers: {
    apikey: env.EVOLUTION_API_TOKEN,
  },
})

export class EvolutionService {
  /**
   * Envia uma mensagem de texto simples
   */
  async sendText(instanceName: string, phone: string, text: string) {
    try {
      await evolutionApi.post(`/message/sendText/${instanceName}`, {
        number: phone,
        text: text,
      })
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message: string }
      console.error(
        `[Evolution] Erro ao enviar mensagem para ${phone}:`,
        err?.response?.data || err.message
      )
    }
  }

  /**
   * Envia um arquivo PDF gerado em base64
   */
  async sendPdf(
    instanceName: string,
    phone: string,
    base64Pdf: string,
    fileName: string
  ) {
    try {
      await evolutionApi.post(`/message/sendMedia/${instanceName}`, {
        number: phone,
        mediatype: 'document',
        mimetype: 'application/pdf',
        caption: 'Aqui está o seu orçamento!', // Mensagem que acompanha o arquivo
        media: base64Pdf,
        fileName: fileName,
      })
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message: string }
      console.error(
        `[Evolution] Erro ao enviar PDF para ${phone}:`,
        err?.response?.data || err.message
      )
    }
  }
  /**
   * Baixa a mídia de uma mensagem da Evolution API em formato Base64
   */
  async getBase64Media(
    instanceName: string,
    messageId: string,
    remoteJid: string,
    fromMe: boolean
  ): Promise<{ base64: string; mimetype: string } | null> {
    try {
      const response = await evolutionApi.post(
        `/chat/getBase64FromMediaMessage/${instanceName}`,
        {
          message: {
            key: {
              id: messageId,
              remoteJid: remoteJid,
              fromMe: fromMe,
            },
          },
        }
      )
      return {
        base64: response.data.base64,
        mimetype: response.data.mimetype,
      }
    } catch (error: unknown) {
      const err = error as { response?: { data: unknown }; message: string }
      console.error(
        `[Evolution] Erro ao baixar mídia da mensagem ${messageId}:`,
        err?.response?.data || err.message
      )
      return null
    }
  }
}
