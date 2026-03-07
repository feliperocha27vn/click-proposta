import cron from 'node-cron'
import { prisma } from '../lib/prisma'

export function setupExpiredPlansJob() {
  const messagingProvider = new MessagingProvider()

  // Agendado para as 09:00 todos os dias
  cron.schedule('0 9 * * *', async () => {
    console.log(
      '[Cron Job] Iniciando verificação de planos expirados e notificações...'
    )

    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const inTwoDays = new Date(today)
      inTwoDays.setDate(today.getDate() + 2)

      const afterTwoDays = new Date(inTwoDays)
      afterTwoDays.setDate(afterTwoDays.getDate() + 1)

      const paymentLink = 'https://click-proposta.umdoce.dev.br/plans'

      // A) Consulta de Aviso Prévio: Vence em exatamente 2 dias
      const usersToWarn = await prisma.user.findMany({
        where: {
          planType: 'PRO',
          planExpiresAt: {
            gte: inTwoDays,
            lt: afterTwoDays,
          },
        },
      })

      console.log(
        `[Cron Job] Encontrados ${usersToWarn.length} usuários para aviso prévio.`
      )

      for (const user of usersToWarn) {
        if (!user.phone) continue

        const message = `⏳ Opa, chefe! Passando para avisar que seu Plano Pro do Click Proposta vence em 2 dias. Para continuar gerando orçamentos ilimitados sem interrupções, já pode garantir a renovação por R$ 14,90 aqui: ${paymentLink}`

        await messagingProvider.sendMessage(user.phone, message)
        console.log(`[Cron Job] Aviso enviado para: ${user.phone}`)
      }

      // B) Consulta de Vencimento: Já expirou
      const expiredUsers = await prisma.user.findMany({
        where: {
          planType: 'PRO',
          planExpiresAt: {
            lt: today,
          },
        },
      })

      console.log(
        `[Cron Job] Encontrados ${expiredUsers.length} usuários com plano expirado.`
      )

      for (const user of expiredUsers) {
        if (!user.phone) continue

        // 1. Atualiza o banco de dados mudando o planType para "FREE"
        await prisma.user.update({
          where: { id: user.id },
          data: {
            planType: 'FREE',
            plan: 'FREE', // Sincroniza o enum 'plan' também
          },
        })

        // 2. Envia a notificação
        const message = `⚠️ Seu Plano Pro venceu! Sua conta voltou para o limite de 2 orçamentos gratuitos por mês. Para liberar os orçamentos ilimitados novamente, faça o PIX de R$ 14,90 no link: ${paymentLink}`

        await messagingProvider.sendMessage(user.phone, message)
        console.log(
          `[Cron Job] Notificação de expiração enviada e plano resetado para: ${user.phone}`
        )
      }
    } catch (error) {
      console.error('[Cron Job] Erro ao processar expiração de planos:', error)
    }
  })

  console.log('[Cron Job] Job de verificação de planos agendado (09:00 daily).')
}
