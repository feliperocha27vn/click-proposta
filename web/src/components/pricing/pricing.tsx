import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import {
  PricingRoot,
  PricingHeader,
  PricingTitle,
  PricingDescription,
  PricingGrid,
  PricingCard,
  PricingCardBadge,
  PricingCardHeader,
  PricingCardName,
  PricingCardPrice,
  PricingCardPriceDescription,
  PricingCardFeatureList,
  PricingCardFeatureItem,
  PricingCardFooter,
} from './pricing-card'

const FREE_FEATURES = [
  'Basic Analytics Dashboard',
  '5GB Cloud Storage',
  'Email and Chat Support',
]

const PRO_FEATURES = [
  'Everything in Free Plan',
  '5GB Cloud Storage',
  'Email and Chat Support',
  'Access to Community Forum',
  'Single User Access',
  'Access to Basic Templates',
  'Mobile App Access',
  '1 Custom Report Per Month',
  'Monthly Product Updates',
  'Standard Security Features',
]

const STARTUP_FEATURES = [
  'Everything in Pro Plan',
  '5GB Cloud Storage',
  'Email and Chat Support',
]

export function Pricing() {
  return (
    <PricingRoot>
      <div className="mx-auto max-w-6xl px-6">
        <PricingHeader>
          <PricingTitle>Pricing that Scales with You</PricingTitle>
          <PricingDescription>
            Gemini is evolving to be more than just the models. It supports an
            entire to the APIs and platforms helping developers and businesses
            innovate.
          </PricingDescription>
        </PricingHeader>

        <PricingGrid>
          {/* Plano Grátis */}
          <PricingCard className="flex flex-col">
            <PricingCardHeader>
              <PricingCardName>Free</PricingCardName>
              <PricingCardPrice>$0 / mo</PricingCardPrice>
              <PricingCardPriceDescription>Per editor</PricingCardPriceDescription>
            </PricingCardHeader>

            <div className="px-6 pb-4 space-y-4 flex-1">
              <hr className="border-dashed" />
              <PricingCardFeatureList>
                {FREE_FEATURES.map(item => (
                  <PricingCardFeatureItem key={item}>{item}</PricingCardFeatureItem>
                ))}
              </PricingCardFeatureList>
            </div>

            <PricingCardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </PricingCardFooter>
          </PricingCard>

          {/* Plano Pro */}
          <PricingCard>
            <PricingCardBadge className="bg-linear-to-br/increasing from-purple-400 to-amber-300 text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Popular
            </PricingCardBadge>

            <div className="flex flex-col">
              <PricingCardHeader>
                <PricingCardName>Pro</PricingCardName>
                <PricingCardPrice>$19 / mo</PricingCardPrice>
                <PricingCardPriceDescription>Per editor</PricingCardPriceDescription>
              </PricingCardHeader>

              <div className="px-6 pb-4 space-y-4">
                <hr className="border-dashed" />
                <PricingCardFeatureList>
                  {PRO_FEATURES.map(item => (
                    <PricingCardFeatureItem key={item}>{item}</PricingCardFeatureItem>
                  ))}
                </PricingCardFeatureList>
              </div>

              <PricingCardFooter>
                <Button asChild className="w-full">
                  <Link to="/plans">Get Started</Link>
                </Button>
              </PricingCardFooter>
            </div>
          </PricingCard>

          {/* Plano Startup */}
          <PricingCard className="flex flex-col">
            <PricingCardHeader>
              <PricingCardName>Startup</PricingCardName>
              <PricingCardPrice>$29 / mo</PricingCardPrice>
              <PricingCardPriceDescription>Per editor</PricingCardPriceDescription>
            </PricingCardHeader>

            <div className="px-6 pb-4 space-y-4 flex-1">
              <hr className="border-dashed" />
              <PricingCardFeatureList>
                {STARTUP_FEATURES.map(item => (
                  <PricingCardFeatureItem key={item}>{item}</PricingCardFeatureItem>
                ))}
              </PricingCardFeatureList>
            </div>

            <PricingCardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/plans">Get Started</Link>
              </Button>
            </PricingCardFooter>
          </PricingCard>
        </PricingGrid>
      </div>
    </PricingRoot>
  )
}
