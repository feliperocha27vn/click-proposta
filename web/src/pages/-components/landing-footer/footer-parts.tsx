import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// ────────────────────────────────────────────────────────────
// FooterRoot — <footer>
// ────────────────────────────────────────────────────────────
export function FooterRoot({ className, ...props }: ComponentProps<'footer'>) {
  return (
    <footer
      data-slot="footer"
      className={twMerge('w-full border-t border-zinc-100 bg-white', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterInner — container interno com padding
// ────────────────────────────────────────────────────────────
export function FooterInner({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-inner"
      className={twMerge(
        'mx-auto max-w-7xl px-4 py-10 md:px-[8%] xl:px-[10%]',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterTop — linha superior com brand + links
// ────────────────────────────────────────────────────────────
export function FooterTop({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-top"
      className={twMerge(
        'flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between',
        className,
      )}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterBrand — área de logo/nome e slogan
// ────────────────────────────────────────────────────────────
export function FooterBrand({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="footer-brand" className={twMerge('', className)} {...props} />
  )
}

// ────────────────────────────────────────────────────────────
// FooterBrandName — nome da marca
// ────────────────────────────────────────────────────────────
export function FooterBrandName({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-brand-name"
      className={twMerge('text-lg font-semibold text-zinc-900', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterBrandTagline — slogan abaixo do nome
// ────────────────────────────────────────────────────────────
export function FooterBrandTagline({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-brand-tagline"
      className={twMerge('mt-1 max-w-xs text-sm text-zinc-400', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterLinks — grupo de colunas de links
// ────────────────────────────────────────────────────────────
export function FooterLinks({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-links"
      className={twMerge('flex flex-wrap gap-12 text-sm text-zinc-500', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterLinkGroup — coluna de links com título
// ────────────────────────────────────────────────────────────
export function FooterLinkGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-link-group"
      className={twMerge('space-y-2', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterLinkGroupTitle — título de cada coluna
// ────────────────────────────────────────────────────────────
export function FooterLinkGroupTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-link-group-title"
      className={twMerge('font-medium text-zinc-800', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterLinkList — lista de links
// ────────────────────────────────────────────────────────────
export function FooterLinkList({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="footer-link-list"
      className={twMerge('space-y-1.5', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterBottom — linha inferior com copyright
// ────────────────────────────────────────────────────────────
export function FooterBottom({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="footer-bottom"
      className={twMerge('mt-10 border-t border-zinc-100 pt-6', className)}
      {...props}
    />
  )
}

// ────────────────────────────────────────────────────────────
// FooterCopyright
// ────────────────────────────────────────────────────────────
export function FooterCopyright({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="footer-copyright"
      className={twMerge('text-xs text-zinc-400', className)}
      {...props}
    />
  )
}
