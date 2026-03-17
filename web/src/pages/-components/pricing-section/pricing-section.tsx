import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Zap } from 'lucide-react'
import {
  LandingPricingRoot,
  LandingPricingHeader,
  LandingPricingBadge,
  LandingPricingTitle,
  LandingPricingDescription,
  LandingPricingGrid,
  LandingPricingCard,
  LandingPricingCardPopularBadge,
  LandingPricingCardHeader,
  LandingPricingCardPlanName,
  LandingPricingCardPriceRow,
  LandingPricingCardPrice,
  LandingPricingCardPeriod,
  LandingPricingCardSubtitle,
  LandingPricingCardFeatureList,
  LandingPricingCardFeatureItem,
  LandingPricingCardFooter,
} from './pricing-section-parts'

const FREE_FEATURES = [
  '2 Propostas / Orçamentos',
  'Painel de gestão completo',
  'Suporte por email',
]

const PRO_FEATURES = [
  'Orçamentos Ilimitados',
  'Geração via IA no WhatsApp',
  "PDF sem marca d'água",
  'Painel de gestão completo',
  'Suporte prioritário',
]

export function PricingSection() {
  return (
    <LandingPricingRoot>
      <div className="mx-auto max-w-[1280px] px-4 md:px-[8%] xl:px-[10%]">
        <LandingPricingHeader>
          <LandingPricingBadge>Preços</LandingPricingBadge>
          <LandingPricingTitle>
            Simples, transparente, sem surpresas
          </LandingPricingTitle>
          <LandingPricingDescription>
            Escolha o melhor plano para o seu negócio.
          </LandingPricingDescription>
        </LandingPricingHeader>

        <LandingPricingGrid>
          {/* Plano Grátis */}
          <LandingPricingCard>
            <LandingPricingCardHeader>
              <LandingPricingCardPlanName>Gratuito</LandingPricingCardPlanName>
              <LandingPricingCardPriceRow>
                <LandingPricingCardPrice>R$ 0</LandingPricingCardPrice>
                <LandingPricingCardPeriod>/ mês</LandingPricingCardPeriod>
              </LandingPricingCardPriceRow>
              <LandingPricingCardSubtitle>
                Perfeito para quem está começando.
              </LandingPricingCardSubtitle>
            </LandingPricingCardHeader>

            <LandingPricingCardFeatureList>
              {FREE_FEATURES.map(f => (
                <LandingPricingCardFeatureItem
                  key={f}
                  className="text-zinc-600"
                  iconClassName="text-zinc-400"
                >
                  {f}
                </LandingPricingCardFeatureItem>
              ))}
            </LandingPricingCardFeatureList>

            <LandingPricingCardFooter>
              <Link to="/login" className="block">
                <Button
                  variant="outline"
                  className="h-11 w-full cursor-pointer rounded-xl border-zinc-300 text-sm"
                >
                  Criar conta gratuita
                </Button>
              </Link>
            </LandingPricingCardFooter>
          </LandingPricingCard>

          {/* Plano Pro */}
          <LandingPricingCard className="border-blue-500 shadow-xl shadow-blue-100">
            <LandingPricingCardPopularBadge>
              ✦ Plano Recomendado
            </LandingPricingCardPopularBadge>

            <LandingPricingCardHeader>
              <LandingPricingCardPlanName className="flex items-center gap-2 text-blue-600">
                <Zap className="size-4" aria-hidden="true" />
                Plano Pro
              </LandingPricingCardPlanName>
              <LandingPricingCardPriceRow>
                <LandingPricingCardPrice>R$ 14,90</LandingPricingCardPrice>
                <LandingPricingCardPeriod>/ mês</LandingPricingCardPeriod>
              </LandingPricingCardPriceRow>
              <LandingPricingCardSubtitle className="font-medium text-blue-600">
                Gere propostas ilimitadas e venda mais
              </LandingPricingCardSubtitle>
            </LandingPricingCardHeader>

            <LandingPricingCardFeatureList>
              {PRO_FEATURES.map(f => (
                <LandingPricingCardFeatureItem
                  key={f}
                  className="text-zinc-700"
                  iconClassName="text-blue-500"
                >
                  {f}
                </LandingPricingCardFeatureItem>
              ))}
            </LandingPricingCardFeatureList>

            <LandingPricingCardFooter className="mt-6">
              <Link to="/login" className="block">
                <Button className="h-11 w-full cursor-pointer rounded-xl bg-blue-600 text-sm hover:bg-blue-700">
                  Ativar Plano Pro
                </Button>
              </Link>
              <p className="mt-3 text-center text-[10px] text-zinc-400">
                Sem renovação automática · Pague quando quiser usar
              </p>
            </LandingPricingCardFooter>
          </LandingPricingCard>
        </LandingPricingGrid>

        <p className="mt-10 text-center text-sm text-zinc-400">
          Dúvidas?{' '}
          <a
            href="mailto:contato@click-proposta.com.br"
            className="text-blue-500 underline underline-offset-2 hover:text-blue-600"
          >
            Fale com a gente
          </a>
          . Sem burocracia.
        </p>
      </div>
    </LandingPricingRoot>
  )
}
