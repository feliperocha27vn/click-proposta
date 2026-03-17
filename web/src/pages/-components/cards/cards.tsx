import { Mail, ScrollText, Settings } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  StepCardsRoot,
  StepCardWrapper,
  StepCardRoot,
  StepCardIconArea,
  StepCardIconWrapper,
  StepCardBody,
  StepCardTitle,
  StepCardDescription,
} from './step-card'

const STEPS = [
  {
    id: '1',
    icon: <ScrollText className="size-8 md:size-10 xl:size-12 text-blue-600" />,
    title: 'Preencha o Formulário',
    description:
      'Um formulário online intuitivo coleta informações do seu cliente, escopo, preços e prazos.',
    wrapperClassName: 'lg:translate-y-0',
    delay: '100ms',
  },
  {
    id: '2',
    icon: <Settings className="size-8 md:size-10 xl:size-12 text-blue-600" />,
    title: 'Gere a Proposta',
    description:
      'As informações são transformadas automaticamente em uma proposta online profissional.',
    wrapperClassName: 'lg:-translate-y-12 xl:-translate-y-16',
    delay: '250ms',
  },
  {
    id: '3',
    icon: <Mail className="size-8 md:size-10 xl:size-12 text-blue-600" />,
    title: 'Envie e Impressione',
    description:
      'Sua proposta está pronta para ser enviada, ajudando você a fechar mais negócios.',
    wrapperClassName: 'lg:-translate-y-6 xl:-translate-y-8',
    delay: '400ms',
  },
]

export function Cards() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <StepCardsRoot ref={ref}>
      {STEPS.map(step => (
        <StepCardWrapper
          key={step.id}
          className={twMerge(
            'opacity-0 translate-y-24 transition-all duration-1000 ease-out',
            step.wrapperClassName,
            isVisible && 'opacity-100 translate-y-0!',
          )}
          style={{ transitionDelay: step.delay }}
        >
          <StepCardRoot>
            <StepCardIconArea>
              {/* Gradiente de hover */}
              <div className="absolute inset-0 bg-linear-to-t from-blue-50/50 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <StepCardIconWrapper>{step.icon}</StepCardIconWrapper>
            </StepCardIconArea>

            <StepCardBody>
              <StepCardTitle>{step.title}</StepCardTitle>
              <StepCardDescription>{step.description}</StepCardDescription>
            </StepCardBody>
          </StepCardRoot>
        </StepCardWrapper>
      ))}
    </StepCardsRoot>
  )
}
