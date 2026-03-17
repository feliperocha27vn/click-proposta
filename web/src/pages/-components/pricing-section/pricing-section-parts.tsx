import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Check, Zap } from 'lucide-react'

// ────────────────────────────────────────────────────────────
// LandingPricingRoot — <section id="pricing">
// ────────────────────────────────────────────────────────────
export function LandingPricingRoot({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      id="pricing"
      data-slot="landing-pricing"
      className={twMerge('w-full bg-zinc-50 py-20 md:py-28', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingHeader — bloco central de título
// ────────────────────────────────────────────────────────────
export function LandingPricingHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-header"
      className={twMerge('mx-auto mb-12 max-w-2xl text-center md:mb-16', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingBadge — pílula de label acima do título
// ────────────────────────────────────────────────────────────
export function LandingPricingBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="landing-pricing-badge"
      className={twMerge(
        'mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingTitle
// ────────────────────────────────────────────────────────────
export function LandingPricingTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="landing-pricing-title"
      className={twMerge(
        'text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingDescription
// ────────────────────────────────────────────────────────────
export function LandingPricingDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="landing-pricing-description"
      className={twMerge('mt-4 text-zinc-500 md:text-lg', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingGrid — grid de 2 cards
// ────────────────────────────────────────────────────────────
export function LandingPricingGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-grid"
      className={twMerge('mx-auto grid max-w-3xl gap-6 md:grid-cols-2', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCard — card individual
// ────────────────────────────────────────────────────────────
export function LandingPricingCard({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-card"
      className={twMerge(
        'relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardPopularBadge — badge "Plano Recomendado"
// ────────────────────────────────────────────────────────────
export function LandingPricingCardPopularBadge({
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      data-slot="landing-pricing-card-popular"
      className={twMerge(
        'absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardHeader
// ────────────────────────────────────────────────────────────
export function LandingPricingCardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-card-header"
      className={twMerge('mb-6', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardPlanName
// ────────────────────────────────────────────────────────────
export function LandingPricingCardPlanName({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="landing-pricing-card-plan-name"
      className={twMerge(
        'text-sm font-semibold uppercase tracking-widest text-zinc-400',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardPriceRow — linha com valor e período
// ────────────────────────────────────────────────────────────
export function LandingPricingCardPriceRow({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-card-price-row"
      className={twMerge('mt-1 flex items-end gap-1', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardPrice — o valor em destaque
// ────────────────────────────────────────────────────────────
export function LandingPricingCardPrice({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="landing-pricing-card-price"
      className={twMerge('text-4xl font-bold text-zinc-900', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardPeriod — ex: "/ mês"
// ────────────────────────────────────────────────────────────
export function LandingPricingCardPeriod({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="landing-pricing-card-period"
      className={twMerge('mb-1 text-zinc-500', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardSubtitle — texto abaixo do preço
// ────────────────────────────────────────────────────────────
export function LandingPricingCardSubtitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="landing-pricing-card-subtitle"
      className={twMerge('mt-2 text-sm text-zinc-500', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardFeatureList
// ────────────────────────────────────────────────────────────
export function LandingPricingCardFeatureList({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="landing-pricing-card-feature-list"
      className={twMerge('flex-1 space-y-3', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardFeatureItem
// ────────────────────────────────────────────────────────────
interface LandingPricingCardFeatureItemProps extends ComponentProps<'li'> {
  iconClassName?: string
}

export function LandingPricingCardFeatureItem({
  className,
  iconClassName,
  children,
  ...props
}: LandingPricingCardFeatureItemProps) {
  return (
    <li
      data-slot="landing-pricing-card-feature-item"
      className={twMerge('flex items-start gap-3 text-sm', className)}
      {...props}
    >
      <Check
        className={twMerge('mt-0.5 size-4 shrink-0', iconClassName)}
        aria-hidden="true"
      />
      {children}
    </li>
  )
}

// ────────────────────────────────────────────────────────────
// LandingPricingCardFooter
// ────────────────────────────────────────────────────────────
export function LandingPricingCardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="landing-pricing-card-footer"
      className={twMerge('mt-8', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// Re-export de ícones utilitários usados na seção
// ────────────────────────────────────────────────────────────
export { Zap }
