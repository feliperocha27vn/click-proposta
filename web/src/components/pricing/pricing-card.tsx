import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Check } from 'lucide-react'

// ────────────────────────────────────────────────────────────
// PricingRoot — container <section>
// ────────────────────────────────────────────────────────────
export function PricingRoot({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="pricing"
      className={twMerge('py-16 md:py-32', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingHeader — área de título centralizada
// ────────────────────────────────────────────────────────────
export function PricingHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="pricing-header"
      className={twMerge('mx-auto max-w-2xl space-y-6 text-center', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingTitle
// ────────────────────────────────────────────────────────────
export function PricingTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="pricing-title"
      className={twMerge('text-center text-4xl font-semibold lg:text-5xl', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingDescription
// ────────────────────────────────────────────────────────────
export function PricingDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="pricing-description"
      className={twMerge('text-muted-foreground', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingGrid — grid de cards
// ────────────────────────────────────────────────────────────
export function PricingGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="pricing-grid"
      className={twMerge('mt-8 grid gap-6 md:mt-20 md:grid-cols-3', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCard
// ────────────────────────────────────────────────────────────
export function PricingCard({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="pricing-card"
      className={twMerge(
        'relative flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardBadge — ex: badge "Popular"
// ────────────────────────────────────────────────────────────
export function PricingCardBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pricing-card-badge"
      className={twMerge(
        'absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full px-3 py-1 text-xs font-medium',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardHeader
// ────────────────────────────────────────────────────────────
export function PricingCardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="pricing-card-header"
      className={twMerge('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardName
// ────────────────────────────────────────────────────────────
export function PricingCardName({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="pricing-card-name"
      className={twMerge('font-medium', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardPrice
// ────────────────────────────────────────────────────────────
export function PricingCardPrice({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pricing-card-price"
      className={twMerge('my-3 block text-2xl font-semibold', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardPriceDescription
// ────────────────────────────────────────────────────────────
export function PricingCardPriceDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="pricing-card-price-description"
      className={twMerge('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardFeatureList — lista <ul> de recursos
// ────────────────────────────────────────────────────────────
export function PricingCardFeatureList({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pricing-card-feature-list"
      className={twMerge('list-outside space-y-3 text-sm', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardFeatureItem — item <li> com ícone Check
// ────────────────────────────────────────────────────────────
export function PricingCardFeatureItem({
  className,
  children,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      data-slot="pricing-card-feature-item"
      className={twMerge('flex items-center gap-2', className)}
      {...props}
    >
      <Check className="size-3 shrink-0" aria-hidden="true" />
      {children}
    </li>
  )
}

// ────────────────────────────────────────────────────────────
// PricingCardFooter
// ────────────────────────────────────────────────────────────
export function PricingCardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="pricing-card-footer"
      className={twMerge('mt-auto flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}
