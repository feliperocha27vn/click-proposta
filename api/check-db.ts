import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const userCount = await prisma.user.count()
    console.log('Total users in DB:', userCount)

    const customerCount = await prisma.customers.count()
    console.log('Total customers in DB:', customerCount)

    const proposalsCount = await prisma.proposal.count()
    console.log('Total proposals in DB:', proposalsCount)
  } catch (error) {
    console.error('Connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
