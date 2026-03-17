import { Bot, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import {
  HeroRoot,
  HeroBackgroundAura,
  HeroInner,
  HeroContent,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroVisual,
  HeroImage,
  HeroFloatingTag,
  HeroFloatingCard,
  HeroFloatingCta,
} from './hero-section-parts'

export function HeroSection() {
  return (
    <HeroRoot>
      <HeroBackgroundAura />

      <HeroInner>
        {/* Coluna de texto */}
        <HeroContent>
          {/* Badge topo */}
          <div className="flex animate-fade-in-up [animation-delay:100ms]">
            <Link to="/login">
              <Badge className="bg-[#1447E6] hover:bg-[#1447E6]/90 gap-1.5 cursor-pointer text-white px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm shadow-md shadow-blue-500/20">
                Comece com 2 propostas grátis
                <ChevronRight className="size-3.5 md:size-4" />
              </Badge>
            </Link>
          </div>

          <HeroTitle>
            Crie propostas profissionais em minutos, não horas.
          </HeroTitle>

          <HeroDescription>
            Deixe a IA escrever. Foque em fechar negócios. Impressione clientes
            com documentos que convertem de verdade.
          </HeroDescription>

          <HeroActions>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full text-base bg-blue-600 hover:bg-blue-700 text-white border-blue-600 md:h-14 md:px-8 md:rounded-xl shadow-lg shadow-blue-500/25 transition-transform hover:scale-105"
              >
                Começar de graça
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-base md:h-14 md:px-8 md:rounded-xl transition-colors hover:bg-zinc-100"
              >
                Como funciona?
              </Button>
            </a>
          </HeroActions>
        </HeroContent>

        {/* Coluna visual */}
        <HeroVisual>
          <HeroFloatingTag>
            <div className="bg-white shadow-xl border border-border/50 rounded-2xl py-3 px-4 flex items-center gap-3 hover:scale-105 transition-transform cursor-default">
              <Bot className="size-5 text-foreground" />
              <span className="text-[13px] text-foreground font-bold leading-none">
                Disponível 24H
              </span>
            </div>
          </HeroFloatingTag>

          <HeroImage>
            <img
              src="https://workers.paper.design/file-assets/01KKHMM6XWMD6NGE6QKNGP7SH0/01KKHRBTMX14FF5GCKQJXVPDPE.png"
              alt="Pessoa usando o aplicativo pelo celular na rua"
              className="w-full h-full object-cover object-center"
            />
          </HeroImage>

          <HeroFloatingCard>
            <Card className="w-full border-none shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:shadow-[0_20px_40px_rgba(0,0,0,0.12)] bg-white rounded-2xl hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-all duration-300">
              <CardContent className="p-4 md:p-5 lg:p-6">
                <h3 className="text-[13px] md:text-sm leading-snug text-foreground font-bold">
                  Escreva os itens da sua proposta como se estivesse conversando.
                  Nossa IA entende tudo!
                </h3>
                <p className="text-[10px] md:text-xs leading-relaxed text-muted-foreground mt-1 md:mt-2">
                  Orçamentos organizados e profissionais que passam confiança para
                  o seu cliente.
                </p>
              </CardContent>
            </Card>
          </HeroFloatingCard>

          <HeroFloatingCta>
            <Link to="/login">
              <Button
                size="sm"
                className="rounded-xl shadow-md font-semibold px-6 bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              >
                Faça seu primeiro orçamento
              </Button>
            </Link>
          </HeroFloatingCta>
        </HeroVisual>
      </HeroInner>
    </HeroRoot>
  )
}
