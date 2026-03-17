import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// ────────────────────────────────────────────────────────────
// StepCardsRoot — container externo com IntersectionObserver
// (wrapper lógico — ver cards.tsx para uso com animação)
// ────────────────────────────────────────────────────────────
export function StepCardsRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-cards"
      className={twMerge(
        'w-full relative z-10 space-y-7 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:space-y-0 py-8 lg:pt-24 lg:pb-12',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardWrapper — wrapper animável de cada card
// ────────────────────────────────────────────────────────────
export function StepCardWrapper({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-card-wrapper"
      className={twMerge('group flex flex-col w-full h-full', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardRoot — o card em si
// ────────────────────────────────────────────────────────────
export function StepCardRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-card"
      className={twMerge(
        'flex flex-col h-full border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500 rounded-3xl bg-white overflow-hidden text-left',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardIconArea — área de destaque com ícone
// ────────────────────────────────────────────────────────────
export function StepCardIconArea({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-card-icon-area"
      className={twMerge(
        'relative flex h-36 md:h-44 xl:h-52 w-full flex-col justify-end overflow-hidden bg-zinc-50/80 p-6 md:p-8',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardIconWrapper — moldura do ícone com hover
// ────────────────────────────────────────────────────────────
export function StepCardIconWrapper({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-card-icon-wrapper"
      className={twMerge(
        'z-10 bg-white/80 backdrop-blur-sm border border-border/50 shadow-sm p-4 w-fit rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-md',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardBody — área de texto (título + descrição)
// ────────────────────────────────────────────────────────────
export function StepCardBody({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="step-card-body"
      className={twMerge(
        'flex flex-col items-start px-6 pt-8 pb-8 h-full border-t border-border/40',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardTitle
// ────────────────────────────────────────────────────────────
export function StepCardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="step-card-title"
      className={twMerge(
        'text-xl xl:text-[22px] font-bold text-foreground tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// StepCardDescription
// ────────────────────────────────────────────────────────────
export function StepCardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="step-card-description"
      className={twMerge(
        'text-sm xl:text-[15px] leading-relaxed text-muted-foreground mt-4 font-normal',
        className,
      )}
      {...props}
    />
  )
}
