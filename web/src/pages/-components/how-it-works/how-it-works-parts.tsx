import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// ────────────────────────────────────────────────────────────
// HowItWorksRoot — <section id="how-it-works">
// ────────────────────────────────────────────────────────────
export function HowItWorksRoot({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      id="how-it-works"
      data-slot="how-it-works"
      className={twMerge(
        'w-full bg-white py-20 md:py-28 relative overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HowItWorksHeader — bloco centralizado com badge + título + descrição
// ────────────────────────────────────────────────────────────
export function HowItWorksHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="how-it-works-header"
      className={twMerge('mb-8 md:mb-12 text-center', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HowItWorksBadge — pílula de label
// ────────────────────────────────────────────────────────────
export function HowItWorksBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="how-it-works-badge"
      className={twMerge(
        'mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HowItWorksTitle
// ────────────────────────────────────────────────────────────
export function HowItWorksTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="how-it-works-title"
      className={twMerge(
        'text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl lg:text-5xl',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HowItWorksDescription
// ────────────────────────────────────────────────────────────
export function HowItWorksDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="how-it-works-description"
      className={twMerge('mt-4 text-zinc-500 md:text-lg max-w-2xl mx-auto', className)}
      {...props}
    />
  )
}
