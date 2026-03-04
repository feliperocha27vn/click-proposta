import axios from 'axios'
import { env } from '../env'

export const api = axios.create({
  baseURL: env.API_URL, // URL da sua API principal
  headers: {
    Authorization: `Bearer ${env.BOT_SERVICE_TOKEN}`,
  },
})
