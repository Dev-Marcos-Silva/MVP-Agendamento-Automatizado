import { AccountPrismaRepositories } from '@/app/repositories/prisma/account-prisma-repositories'
import { CreateAccountUseCase } from '../create-account'

export function makeCreateAccountUseCase() {
  const accountRepository = new AccountPrismaRepositories()

  const createAccountUseCase = new CreateAccountUseCase(accountRepository)

  return createAccountUseCase
}
