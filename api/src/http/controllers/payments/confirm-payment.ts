import { env } from '@/env'
import { makeChangePlanUserUseCase } from '@/factories/users/make-change-plan-user-use-case'
import { stripe } from '@/lib/stripe'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type Stripe from 'stripe'

export const confirmPayment: FastifyPluginAsyncZod = async app => {
  app.post(
    '/payments/webhook',
    {
      config: {
        rawBody: true,
      },
      schema: {
        tags: ['Payments'],
        operationId: 'confirmPayment',
        // Hide from Swagger/Scalar because it's a binary/raw body endpoint
        hide: true,
      },
    },
    async (request, reply) => {
      const signature = request.headers['stripe-signature'] as string

      if (!signature) {
        return reply
          .status(400)
          .send({ message: 'Missing stripe-signature header' })
      }

      let event: Stripe.Event

      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody as string,
          signature,
          env.STRIPE_WEBHOOK_SECRET
        )
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`)
        return reply
          .status(400)
          .send({ message: `Webhook Error: ${err.message}` })
      }

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session

          const userId = session.client_reference_id
          const stripeId = session.id

          if (!userId) {
            console.error(
              'Session completed without client_reference_id (userId)'
            )
            return reply
              .status(400)
              .send({ message: 'Missing userId in session' })
          }

          console.log('Payment confirmed via Stripe for session:', stripeId)

          const changePlanUseCase = makeChangePlanUserUseCase()

          console.log('Activating PRO plan for user:', userId)

          try {
            await changePlanUseCase.execute({
              userId,
            })
            console.log('Plan activated successfully for user:', userId)
          } catch (error) {
            console.error('Error activating plan:', error)
            return reply.status(500).send({ message: 'Error activating plan' })
          }
          break
        }

        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      return reply.status(200).send({ received: true })
    }
  )
}
