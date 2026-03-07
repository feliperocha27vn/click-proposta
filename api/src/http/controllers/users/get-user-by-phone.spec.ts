import { app } from '@/app'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get User By Phone (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user by phone with plan details', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        planType: 'PRO',
        planExpiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // tomorrow
      },
    })

    const response = await request(app.server)
      .get('/verify-phone')
      .query({ phone: '123456789' })
      .set('Authorization', `Bearer ${env.BOT_SERVICE_TOKEN}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.user).toEqual(
      expect.objectContaining({
        phone: '123456789',
        planType: 'PRO',
        countProposalsInMonth: 0,
      })
    )
    expect(response.body.user.planExpiresAt).not.toBeNull()
  })

  it('should be able to handle phone with 55 prefix', async () => {
    await prisma.user.create({
      data: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '987654321',
        planType: 'FREE',
      },
    })

    const response = await request(app.server)
      .get('/verify-phone')
      .query({ phone: '55987654321' })
      .set('Authorization', `Bearer ${env.BOT_SERVICE_TOKEN}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.user.phone).toBe('987654321')
  })

  it('should return 404 if user does not exist', async () => {
    const response = await request(app.server)
      .get('/verify-phone')
      .query({ phone: 'non-existing' })
      .set('Authorization', `Bearer ${env.BOT_SERVICE_TOKEN}`)
      .send()

    expect(response.statusCode).toBe(404)
  })

  it('should return 401 if service token is invalid', async () => {
    await prisma.user.create({
      data: {
        name: 'Invalid Token User',
        email: 'invalid@example.com',
        phone: '000000000',
      },
    })

    const response = await request(app.server)
      .get('/verify-phone')
      .query({ phone: '000000000' })
      .set('Authorization', `Bearer invalid-token`)
      .send()

    expect(response.statusCode).toBe(401)
  })
})
