import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// ────────────────────────────────────────────────────────────
// HeroRoot — <section> principal
// ────────────────────────────────────────────────────────────
export function HeroRoot({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="hero"
      className={twMerge('relative w-full overflow-hidden bg-white', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroBackgroundAura — gradiente decorativo de fundo
// ────────────────────────────────────────────────────────────
export function HeroBackgroundAura({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      data-slot="hero-background-aura"
      className={twMerge('pointer-events-none absolute inset-0 z-0', className)}
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 60% -10%, oklch(0.88 0.1 240 / 0.4), transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, oklch(0.85 0.08 180 / 0.25), transparent 60%)',
      }}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroInner — container de conteúdo (2 colunas no md+)
// ────────────────────────────────────────────────────────────
export function HeroInner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-inner"
      className={twMerge(
        'relative z-10 mx-auto flex w-full max-w-md flex-col md:max-w-5xl md:flex-row md:items-center md:justify-between lg:max-w-7xl',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroContent — coluna de texto (esquerda)
// ────────────────────────────────────────────────────────────
export function HeroContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-content"
      className={twMerge(
        'flex flex-col gap-5 p-6 pb-2 md:w-[55%] md:p-8 lg:p-16 relative z-10',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroTitle — <h1>
// ────────────────────────────────────────────────────────────
export function HeroTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="hero-title"
      className={twMerge(
        'text-[38px] md:text-5xl lg:text-6xl xl:text-[68px] leading-[1.12] tracking-tight text-foreground font-extrabold text-balance animate-fade-in-up [animation-delay:200ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroDescription — parágrafo de subtítulo
// ────────────────────────────────────────────────────────────
export function HeroDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="hero-description"
      className={twMerge(
        'text-base md:text-lg xl:text-xl leading-relaxed text-foreground-subtle max-w-xl animate-fade-in-up [animation-delay:300ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroActions — linha de botões CTA
// ────────────────────────────────────────────────────────────
export function HeroActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-actions"
      className={twMerge(
        'flex flex-col sm:flex-row gap-3 mt-2 md:mt-6 animate-fade-in-up [animation-delay:400ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroVisual — coluna visual (direita)
// ────────────────────────────────────────────────────────────
export function HeroVisual({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-visual"
      className={twMerge(
        'relative mt-8 mb-10 md:mt-0 md:mb-0 flex flex-col mx-6 md:mx-0 md:w-[45%] md:p-8 md:pl-0 lg:p-12 z-10',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroImage — imagem de capa
// ────────────────────────────────────────────────────────────
export function HeroImage({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-image"
      className={twMerge(
        'w-full h-65 md:h-100 lg:h-150 relative rounded-[20px] md:rounded-3xl overflow-hidden bg-muted shrink-0 shadow-lg md:shadow-2xl animate-fade-in-up [animation-delay:500ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroFloatingTag — tag flutuante (ex: "Disponível 24H")
// ────────────────────────────────────────────────────────────
export function HeroFloatingTag({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-floating-tag"
      className={twMerge(
        'self-end mb-6 md:absolute md:-left-4 lg:-left-8 md:top-4 lg:top-8 md:mb-0 z-40 animate-fade-in-up [animation-delay:600ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroFloatingCard — card flutuante sobre a imagem
// ────────────────────────────────────────────────────────────
export function HeroFloatingCard({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-floating-card"
      className={twMerge(
        'absolute top-4 left-0 w-[70%] max-w-65 md:top-auto md:bottom-8 lg:bottom-16 md:-left-8 lg:-left-16 md:w-72 lg:w-80 md:max-w-none z-20 animate-fade-in-up [animation-delay:700ms]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeroFloatingCta — CTA flutuante mobile
// ────────────────────────────────────────────────────────────
export function HeroFloatingCta({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-floating-cta"
      className={twMerge(
        'absolute -bottom-5 left-0 w-full flex justify-center md:hidden z-30 animate-fade-in-up [animation-delay:800ms]',
        className,
      )}
      {...props}
    />
  )
}
