import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  // Ignora requisições OPTIONS (CORS preflight)
  if (request.method === 'OPTIONS') {
    return reply.status(204).send()
  }

  try {
    await request.jwtVerify()
  } catch (err) {
    console.error('❌ Erro na verificação JWT:', err)
    return reply.status(401).send({ error: 'Token inválido' })
  }
}
