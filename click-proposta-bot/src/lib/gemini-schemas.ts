import { type Schema, Type } from '@google/genai'

export interface ExtractedItem {
  title: string
  amount: number
  price?: number | null
  description?: string
}

// Resposta completa do Gemini com Chain-of-Thought
export interface GeminiExtractionResponse {
  _raciocinio: string
  items: ExtractedItem[]
}

// Schema do objeto raiz que o Gemini deve retornar
export const budgetExtractionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    _raciocinio: {
      type: Type.STRING,
      description:
        'Camada de processamento lógico (Chain-of-Thought). Narrar analiticamente: identificação e descarte de gírias, cálculo matemático das quantidades e deliberação conservadora sobre preços ANTES de preencher os items.',
    },
    items: {
      type: Type.ARRAY,
      description: 'Lista de itens de orçamento extraídos da mensagem bruta.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description:
              'Nome do produto ou serviço em Title Case com erros ortográficos corrigidos. Ex: "Pneu Aro 15", "Óleo Para Motor".',
          },
          amount: {
            type: Type.NUMBER,
            description:
              'Quantidade absoluta inteira. "um par" = 2, "meia dúzia" = 6, "duas dúzias" = 24. Singular sem quantidade explícita = 1.',
          },
          price: {
            type: Type.NUMBER,
            description:
              'Preço unitário SOMENTE se declarado de forma explícita e inegável pelo usuário. Gírias monetárias ("conto", "pila", "reais") são convertidas para valor numérico. SE NÃO HOUVER PREÇO EXPLÍCITO, retornar null obrigatoriamente.',
            nullable: true,
          },
          description: {
            type: Type.STRING,
            description:
              'Descrição longa, especificações e detalhes técnicos do serviço fornecido pelo usuário. Obrigatoriamente usado para orçamentos de serviço civil.',
            nullable: true,
          },
        },
        required: ['title', 'amount'],
      },
    },
  },
  required: ['_raciocinio', 'items'],
}

// Mantemos o alias para compatibilidade com código existente
export const budgetItemSchema = budgetExtractionSchema

export function buildExtractionPrompt(
  text: string,
  budgetType: 'product' | 'civil'
): string {
  const typeLabel =
    budgetType === 'product'
      ? 'Orçamento de Produtos'
      : 'Orçamento de Serviço Civil'

  return `Você é o processador cognitivo e o motor de extração estruturada de entidades primário do sistema corporativo "Click Proposta".
Sua interface de atuação é exclusivamente backend, e sua diretriz operacional singular é atuar como o aparato de inteligência analítica que processa solicitações de usuários finais provenientes de mensagens textuais no WhatsApp.

O usuário final enviará mensagens em linguagem natural bruta, listando um ou múltiplos itens para compor um(a) ${typeLabel}. A entrada de texto será tipicamente informal. Sua incumbência é agir como um filtro de estado, ignorar ruídos e focar na extração das entidades de negócio.

REGRAS DE EXTRAÇÃO:

1. Higienização e Padronização de Títulos (title): Extraia o nome do produto ou serviço. Corrija grafia e use "Title Case". O título deve ser curto e focado no objeto.

2. Filtro de Irrelevância: Se a mensagem NÃO contiver nenhum item de orçamento claro, retorne "items" vazio []. NUNCA transforme saudações isoladas em itens.

3. Quantidades (amount): Transforme termos coloquiais em números inteiros. Singular ou sem métrica = 1. "um par" = 2.

4. Preços Unitários (price): Popular SOMENTE se declarado de forma explícita. Interprete "conto", "pila", "reais". Se não houver preço, retorne null.

5. Chain-of-Thought obrigatória: Preencha o campo _raciocinio narrando brevemente o que foi encontrado e por que.

EXEMPLOS POSITIVOS:
- "20 camisas a 10 reais" -> { items: [{ title: "Camisas", amount: 20, price: 10 }] }
- "Pintura de parede 20m2" -> { items: [{ title: "Pintura de Parede", amount: 1, description: "Pintura de parede 20m2" }] }
- "2 pneus aro 15 de 300 cada" -> { items: [{ title: "Pneu Aro 15", amount: 2, price: 300 }] }

EXEMPLOS NEGATIVOS (items = []):
- "Olá bom dia!"
- "muito obrigado"
- "1" (comando de finalização isolado)

MENSAGEM DO USUÁRIO:
"""
${text}
"""`
}
