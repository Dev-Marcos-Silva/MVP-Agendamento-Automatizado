import type { Account, Prisma } from '@prisma/client'

export interface AccountRepository {

  createAccount(data: Prisma.AccountCreateInput): Promise<void>

  findByEmail(email: string ): Promise<Account | null>

  findById(accountId: string ): Promise<Account | null>
  
}
