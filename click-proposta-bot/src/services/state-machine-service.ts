import { env } from '../env'
import { api } from '../lib/axios'
import type {
  ChatSession,
  SessionRepository,
} from '../repositories/session-repository'
import { EvolutionService } from './evolution-service'
import { GeminiService } from './gemini-service'

export class StateMachineService {
  private geminiService: GeminiService
  private evolutionService: EvolutionService

  constructor(private sessionRepository: SessionRepository) {
    this.geminiService = new GeminiService()
    this.evolutionService = new EvolutionService()
  }

  async processIncomingMessage(
    instanceName: string,
    phone: string,
    text: string
  ) {
    // 1. Traz a sessão do usuário do Redis
    const session = await this.sessionRepository.getSession(phone)

    // 2. Se não tem sessão ativa, é usuário novo iniciando a conversa
    if (!session) {
      return this.handleNewUser(phone)
    }

    // 3. O switch/case é o coração da máquina de estados
    switch (session.state) {
      case 'AWAITING_TYPE':
        return this.handleAwaitingType(phone, text)

      case 'COLLECTING_ITEMS':
        return this.handleCollectingItems(session, phone, text)

      case 'CONFIRMING':
        return this.handleConfirming(instanceName, session, phone, text)

      default:
        // Se o estado for inválido ou deu erro, reseta a sessão por segurança
        await this.sessionRepository.clearSession(phone)
        return '⚠️ Algo deu errado. Reiniciamos sua sessão.\n\nPara começar, envie *Oi*.'
    }
  }

  // --- MÉTODOS PRIVADOS PARA CADA ESTADO ---

  private async handleNewUser(phone: string) {
    try {
      // Remove o código do país (55) se o número for brasileiro para achar no banco
      let apiPhone = phone
      if (apiPhone.startsWith('55') && apiPhone.length === 13) {
        apiPhone = apiPhone.substring(2)
      }

      // Bate na API v2 para ver se o telefone existe
      const response = await api.get('/verify-phone', {
        headers: { Authorization: `Bearer ${env.BOT_SERVICE_TOKEN}` },
        params: { phone: apiPhone },
      })

      const user = response.data.user

      // Se existir, salva novo estado, pedindo o tipo de orçamento e guarda o ID do usuário
      await this.sessionRepository.saveSession(phone, {
        phone,
        state: 'AWAITING_TYPE',
        userId: user.id,
      })

      return `👋 Olá, *${user.name || 'cliente'}*! Que bom ter você aqui.\n\nPara começar, qual o tipo do seu orçamento?\n\n*1* — Produtos\n*2* — Serviço Civil\n\nResponda com *1* ou *2*.`
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { status: number }
        message: string
      }
      if (axiosError.response?.status === 404) {
        return '😕 Hmm, não encontrei seu número no *Click Proposta*.\n\nPara usar o bot, você precisa ter uma conta ativa. Crie a sua em:\n👉 https://click-proposta.umdoce.dev.br/login'
      }

      console.error(
        '[StateMachine] Erro ao verificar usuário:',
        axiosError.message
      )
      return '⚠️ Algo deu errado no nosso lado, desculpe o transtorno.\n\nTente novamente em instantes enviando um *Oi*.'
    }
  }

  private async handleAwaitingType(phone: string, text: string) {
    const isProduct =
      text.trim() === '1' || text.toLowerCase().includes('produto')
    const isCivil =
      text.trim() === '2' ||
      text.toLowerCase().includes('serviço') ||
      text.toLowerCase().includes('civil')

    if (!isProduct && !isCivil) {
      return '🤔 Não entendi sua resposta. Por favor, escolha uma das opções:\n\n*1* — Produtos\n*2* — Serviço Civil'
    }

    const budgetType = isProduct ? 'product' : 'civil'

    await this.sessionRepository.saveSession(phone, {
      state: 'COLLECTING_ITEMS',
      budgetType,
    })

    return '✅ Ótimo! Agora me mande os itens do orçamento.\n\nPode digitar assim:\n_2x Parafuso phillips 5cm — R$ 0,50_\n_1x Cimento 50kg — R$ 35,00_\n\nOu envie um áudio com os itens.\n\nQuando terminar, envie *1*.'
  }

  private async handleCollectingItems(
    session: ChatSession,
    phone: string,
    text: string
  ) {
    if (text.trim() === '1') {
      const currentData = session.collectedData || ''

      if (!currentData.trim()) {
        return '⚠️ Você ainda não enviou nenhum item.\n\nMe mande os itens antes de finalizar:\n_Exemplo: 3x tinta acrílica branca — R$ 45,00_'
      }

      // 1. Chamar o Gemini pra extrair a lista estruturada de itens
      const extractedItems = await this.geminiService.extractBudgetItems(
        currentData,
        session.budgetType || 'product'
      )

      if (extractedItems.length === 0) {
        return '🤖 Não consegui identificar os itens da sua mensagem.\n\nTente enviar no formato:\n_Quantidade x Descrição — Valor_\n\nExemplo: _2x parafuso 5cm — R$ 0,50_'
      }

      // 2. Formatar o resumo para o usuário
      let summaryText = ''
      let totalAmount = 0

      for (const item of extractedItems) {
        summaryText += `• ${item.amount}x ${item.title}${item.price ? ` — R$ ${item.price}` : ''}\n`
        totalAmount += item.amount
      }

      // 3. Salvar os itens extraídos na sessão para o próximo passo usar
      await this.sessionRepository.saveSession(phone, {
        state: 'CONFIRMING',
        extractedItems: JSON.stringify(extractedItems),
      })

      return `📋 *Resumo do seu orçamento:*\n\n${summaryText}\nTotal de itens: *${totalAmount}*\n\nConfirmo a geração do PDF?\n\n*Sim* — Gerar PDF\n*Não* — Cancelar`
    }

    // Acumula o que a pessoa está dizendo
    const currentData = session.collectedData || ''
    await this.sessionRepository.saveSession(phone, {
      collectedData: currentData + '\n' + text,
    })

    return '✍️ Anotado! Pode continuar enviando os itens.\n\nQuando terminar, envie *1*.'
  }

  private async handleConfirming(
    instanceName: string,
    session: ChatSession,
    phone: string,
    text: string
  ) {
    if (text.toLowerCase() === 'sim') {
      try {
        await this.evolutionService.sendText(
          instanceName,
          phone,
          '⏳ Gerando seu orçamento em PDF... Aguarde só um instante!'
        )

        if (!session.extractedItems || !session.userId) {
          await this.sessionRepository.clearSession(phone)
          return '❌ Ops! Os dados do seu orçamento foram perdidos.\n\nPor favor, envie *Oi* para começar novamente.'
        }

        const items = JSON.parse(session.extractedItems)
        const budgetType = session.budgetType || 'product'

        interface BudgetItem {
          title: string
          amount: number
          price: number
        }

        // Calcula o valor total do orçamento informando 0 se a Gemini não achou preço
        const totalValue = items.reduce(
          (acc: number, item: BudgetItem) =>
            acc + (item.price || 0) * (item.amount || 1),
          0
        )

        // Mapeia os itens da Gemini para o formato exato que a API espera (services)
        const mappedServices = items.map((item: BudgetItem) => ({
          title: item.title,
          description: '',
          quantity: item.amount || 1,
          price: item.price || 0,
        }))

        const endpoint =
          budgetType === 'product' ? '/pdf/generate-product' : '/pdf/generate'

        const response = await api.post(
          endpoint,
          {
            userId: session.userId,
            total: String(totalValue),
            services: mappedServices,
          },
          {
            headers: {
              Authorization: `Bearer ${env.BOT_SERVICE_TOKEN}`,
            },
            responseType: 'arraybuffer',
          }
        )

        const base64Pdf = Buffer.from(response.data, 'binary').toString(
          'base64'
        )
        const fileName = `orcamento-${budgetType}-${Date.now()}.pdf`

        await this.evolutionService.sendPdf(
          instanceName,
          phone,
          base64Pdf,
          fileName
        )

        await this.sessionRepository.clearSession(phone)

        return null
      } catch (error: unknown) {
        const err = error as { message: string }
        console.error('[StateMachine] Erro ao gerar PDF:', err.message)
        await this.sessionRepository.clearSession(phone)
        return '❌ Não conseguimos gerar o PDF desta vez.\n\nPor favor, tente novamente enviando *Oi*. Se o erro persistir, entre em contato com o suporte.'
      }
    } else {
      await this.sessionRepository.clearSession(phone)
      return '👍 Orçamento cancelado.\n\nQuando quiser criar um novo, é só enviar *Oi*.'
    }
  }
}
