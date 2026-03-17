import { Cards } from '../cards'
import {
  HowItWorksRoot,
  HowItWorksHeader,
  HowItWorksBadge,
  HowItWorksTitle,
  HowItWorksDescription,
} from './how-it-works-parts'

export function HowItWorks() {
  return (
    <HowItWorksRoot>
      <div className="mx-auto max-w-7xl px-4 md:px-[8%] xl:px-[10%] relative z-10">
        <HowItWorksHeader>
          <HowItWorksBadge>Como funciona</HowItWorksBadge>
          <HowItWorksTitle>Três passos para a proposta perfeita</HowItWorksTitle>
          <HowItWorksDescription>
            Processo ágil e moderno para você fechar mais negócios, sem estresse
            e complicação.
          </HowItWorksDescription>
        </HowItWorksHeader>

        <Cards />
      </div>
    </HowItWorksRoot>
  )
}
