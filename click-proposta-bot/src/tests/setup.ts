import { config } from 'dotenv'
import 'dotenv/config'
import { resolve } from 'node:path'

// Carrega o .env.test antes de qualquer import que use `env`
config({ path: resolve(__dirname, '../../.env.test') })
