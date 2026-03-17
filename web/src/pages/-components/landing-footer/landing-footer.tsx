import { Link } from '@tanstack/react-router'
import {
  FooterRoot,
  FooterInner,
  FooterTop,
  FooterBrand,
  FooterBrandName,
  FooterBrandTagline,
  FooterLinks,
  FooterLinkGroup,
  FooterLinkGroupTitle,
  FooterLinkList,
  FooterBottom,
  FooterCopyright,
} from './footer-parts'

export function LandingFooter() {
  return (
    <FooterRoot>
      <FooterInner>
        <FooterTop>
          <FooterBrand>
            <FooterBrandName>
              <span className="text-blue-600">Click</span>.proposta
            </FooterBrandName>
            <FooterBrandTagline>
              Transformando ideias em propostas vencedoras.
            </FooterBrandTagline>
          </FooterBrand>

          <FooterLinks>
            <FooterLinkGroup>
              <FooterLinkGroupTitle>Produto</FooterLinkGroupTitle>
              <FooterLinkList>
                <li>
                  <a
                    href="#how-it-works"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Como funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Preços
                  </a>
                </li>
              </FooterLinkList>
            </FooterLinkGroup>

            <FooterLinkGroup>
              <FooterLinkGroupTitle>Legal</FooterLinkGroupTitle>
              <FooterLinkList>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="transition-colors hover:text-zinc-900"
                  >
                    Termos de Serviço
                  </Link>
                </li>
              </FooterLinkList>
            </FooterLinkGroup>
          </FooterLinks>
        </FooterTop>

        <FooterBottom>
          <FooterCopyright>
            © {new Date().getFullYear()} Click Proposta. Todos os direitos
            reservados.
          </FooterCopyright>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  )
}
