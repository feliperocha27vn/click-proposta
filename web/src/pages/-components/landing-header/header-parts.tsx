import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// ────────────────────────────────────────────────────────────
// HeaderRoot — <header>
// ────────────────────────────────────────────────────────────
export function HeaderRoot({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      data-slot="header"
      className={twMerge(
        'relative z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeaderInner — container interno com layout flex
// ────────────────────────────────────────────────────────────
export function HeaderInner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-inner"
      className={twMerge(
        'mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-[8%] xl:px-[10%]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeaderNav — navegação desktop
// ────────────────────────────────────────────────────────────
export function HeaderNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="header-nav"
      className={twMerge(
        'hidden items-center gap-8 text-sm text-zinc-600 md:flex',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeaderActions — botões de CTA desktop
// ────────────────────────────────────────────────────────────
export function HeaderActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-actions"
      className={twMerge('hidden items-center gap-3 md:flex', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeaderMobileMenu — painel do menu mobile
// ────────────────────────────────────────────────────────────
export function HeaderMobileMenu({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-mobile-menu"
      className={twMerge(
        'border-t border-zinc-100 bg-white px-4 pb-6 pt-4 md:hidden',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// HeaderMobileNav — navegação interna do menu mobile
// ────────────────────────────────────────────────────────────
export function HeaderMobileNav({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="header-mobile-nav"
      className={twMerge('flex flex-col gap-4 text-sm text-zinc-700', className)}
      {...props}
    />
  )
}
