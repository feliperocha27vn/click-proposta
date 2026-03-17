import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import {
  HeaderRoot,
  HeaderInner,
  HeaderNav,
  HeaderActions,
  HeaderMobileMenu,
  HeaderMobileNav,
} from './header-parts'

export function LandingHeader() {
  const [open, setOpen] = useState(false)

  return (
    <HeaderRoot>
      <HeaderInner>
        {/* Logo */}
        <a href="/" className="text-xl font-semibold">
          <span className="text-blue-600">Click</span>
          <span className="text-zinc-800">.proposta</span>
        </a>

        <HeaderNav>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-zinc-900"
          >
            Como funciona
          </a>
          <a href="#pricing" className="transition-colors hover:text-zinc-900">
            Preços
          </a>
        </HeaderNav>

        <HeaderActions>
          <Link to="/login">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer text-sm"
            >
              Entrar
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="cursor-pointer rounded-lg text-sm">
              Começar grátis
            </Button>
          </Link>
        </HeaderActions>

        {/* Botão burger mobile */}
        <button
          type="button"
          onClick={() => setOpen(p => !p)}
          className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </HeaderInner>

      {/* Menu mobile */}
      {open && (
        <HeaderMobileMenu>
          <HeaderMobileNav>
            <a href="#how-it-works" onClick={() => setOpen(false)}>
              Como funciona
            </a>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Preços
            </a>
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="mt-2 h-10 w-full cursor-pointer rounded-xl text-sm">
                Começar grátis
              </Button>
            </Link>
          </HeaderMobileNav>
        </HeaderMobileMenu>
      )}
    </HeaderRoot>
  )
}
