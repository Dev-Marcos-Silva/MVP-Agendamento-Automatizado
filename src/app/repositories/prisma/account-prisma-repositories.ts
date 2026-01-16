import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { AccountRepository } from '../account-repositories'

export class AccountPrismaRepositories implements AccountRepository {
  async createAccount(data: Prisma.AccountCreateInput) {
    await prisma.account.create({ data })
  }

  async findByEmail(email: string) {
    const account = await prisma.account.findUnique({
      where: {
        email,
      },
    })

    return account
  }
  async findById(accountId: string) {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    })

    return account
  }
}
