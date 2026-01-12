import { randomUUID } from 'node:crypto'
import type { Account, Prisma } from '@prisma/client'
import type { AccountRepository } from '../account-repositories'

export class InMemoryAccountRepository implements AccountRepository {
  public items: Account[] = []

  async createAccount({id, name, email, password }: Prisma.AccountCreateInput) {
    const account = {
      id: id ?? randomUUID(),
      name,
      email,
      password,
    }

    this.items.push(account)

  }

  async findByEmail(email: string) {

    const account = this.items.find(item => item.email === email)

    if(!account){
      return null
    }

    return account
    
  }

  async findById(accountId: string) {

    const account = this.items.find(item => item.id === accountId)

    if(!account){
      return null
    }

    return account
    
  }
}
