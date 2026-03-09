import { env } from '../../env'
import { api } from '../../lib/axios'
import type { MessagingProvider } from '../../providers/messaging/messaging-provider'
import type {
  ChatSession,
  SessionRepository,
} from '../../repositories/session-repository'

interface HandleConfirmingUseCaseRequest {
  instanceName: string
  session: ChatSession
  phone: string
  text: string
}

export class HandleConfirmingUseCase {
  constructor(
    private sessionRepository: SessionRepository,
    private messagingProvider: MessagingProvider
  ) {}

  async execute({
    instanceName,
    session,
    phone,
    text,
  }: HandleConfirmingUseCaseRequest): Promise<string | null> {
    if (text.toLowerCase() === 'sim') {
      try {
        await this.messagingProvider.sendText({
          instanceName,
          phone,
          text: '⏳ Gerando seu orçamento em PDF... Aguarde só um instante!',
        })

        if (!session.userId) {
          await this.sessionRepository.clearSession(phone)
          return '❌ Ops! Os dados do seu orçamento foram perdidos.\n\nPor favor, envie *Oi* para começar novamente.'
        }

        // Verifica o plano do usuário antes de gerar o PDF
        let apiPhone = phone
        if (apiPhone.startsWith('55') && apiPhone.length === 13) {
          apiPhone = apiPhone.substring(2)
        }

        const userResponse = await api.get('/verify-phone', {
          headers: { Authorization: `Bearer ${env.BOT_SERVICE_TOKEN}` },
          params: { phone: apiPhone },
        })

        const user = userResponse.data.user
        const paymentLink = 'https://click-proposta.umdoce.dev.br/plans'

        if (user.planType === 'FREE' && user.countProposalsInMonth >= 2) {
          await this.sessionRepository.clearSession(phone)
          return `Chefe, seus orçamentos gratuitos deste mês acabaram! 🚧\n\nPara continuar gerando orçamentos ilimitados, ative o *Plano Pro* por apenas *R$ 14,90/mês*.\n\nPague no PIX aqui:\n👉 ${paymentLink}`
        }

        if (user.planType === 'PRO') {
          const now = new Date()
          const planExpiresAt = user.planExpiresAt
            ? new Date(user.planExpiresAt)
            : null

          if (planExpiresAt && now > planExpiresAt) {
            await this.sessionRepository.clearSession(phone)
            return `Seu *Plano Pro* expirou! 😱\n\nRenove agora por apenas *R$ 14,90* para continuar com orçamentos ilimitados:\n👉 ${paymentLink}`
          }

          if (user.countProposalsInMonth >= 100) {
            await this.sessionRepository.clearSession(phone)
            return 'Você atingiu o limite de Fair Use (100 orçamentos) do seu Plano Pro este mês. 🛑\n\nCaso precise de mais, entre em contato com nosso suporte.'
          }
        }

        if (!session.extractedItems) {
          await this.sessionRepository.clearSession(phone)
          return '❌ Ops! Os dados do seu orçamento foram perdidos.\n\nPor favor, envie *Oi* para começar novamente.'
        }

        const items = JSON.parse(session.extractedItems)
        const budgetType = session.budgetType || 'product'

        interface BudgetItem {
          title: string
          amount: number
          price: number
          description?: string
        }

        // Calcula o valor total do orçamento informando 0 se a Gemini não achou preço
        const calculatedTotal = items.reduce(
          (acc: number, item: BudgetItem) =>
            acc + (item.price || 0) * (item.amount || 1),
          0
        )

        const finalTotal = session.totalValue || calculatedTotal

        // Mapeia os itens da Gemini para o formato exato que a API espera (services)
        const mappedServices = items.map((item: BudgetItem) => ({
          title: item.title,
          description: item.description || '',
          quantity: item.amount || 1,
          price: item.price || 0,
        }))

        const isCivil = budgetType === 'civil'
        const endpoint = isCivil ? '/pdf/generate' : '/pdf/generate-product'

        const payload: Record<string, unknown> = {
          userId: session.userId,
          total: String(finalTotal),
          services: mappedServices,
        }

        if (isCivil && session.customerName) {
          payload.nameCustomer = session.customerName
        }

        const response = await api.post(endpoint, payload, {
          headers: {
            Authorization: `Bearer ${env.BOT_SERVICE_TOKEN}`,
          },
          responseType: 'arraybuffer',
        })

        const base64Pdf = Buffer.from(response.data, 'binary').toString(
          'base64'
        )
        const sanitizeFilename = (name: string) => {
          return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '_')
        }

        const customerPart = session.customerName
          ? `-${sanitizeFilename(session.customerName)}`
          : ''
        const fileName = `orcamento-${budgetType}${customerPart}.pdf`

        await this.messagingProvider.sendPdf({
          instanceName,
          phone,
          base64Pdf,
          fileName,
        })

        await this.sessionRepository.clearSession(phone)

        return null
      } catch (error: unknown) {
        const err = error as { message: string }
        console.error(
          '[UseCase: HandleConfirming] Erro ao gerar PDF:',
          err.message
        )
        await this.sessionRepository.clearSession(phone)
        return '❌ Não conseguimos gerar o PDF desta vez.\n\nPor favor, tente novamente enviando *Oi*. Se o erro persistir, entre em contato com o suporte.'
      }
    } else {
      await this.sessionRepository.clearSession(phone)
      return '👍 Orçamento cancelado.\n\nQuando quiser criar um novo, é só enviar *Oi*.'
    }
  }
}
