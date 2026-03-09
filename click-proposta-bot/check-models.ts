import { GoogleGenAI } from '@google/genai'
import { env } from './src/env'

async function listModels() {
  const genAI = new GoogleGenAI(env.GEMINI_API_KEY)
  // Default to v1beta for listing
  const client = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
    apiVersion: 'v1beta',
  })

  try {
    console.log('Listing models (v1beta):')
    const result = await client
      .getGenerativeModel({ model: 'gemini-2.5-flash' })
      .listModels()
    for (const model of result.models) {
      console.log(`- ${model.name} (${model.displayName})`)
      console.log(
        `  Supported Actions: ${model.supportedGenerationMethods.join(', ')}`
      )
    }
  } catch (error) {
    console.error('Error listing models:', error)
  }
}

listModels()
