import { AccountPrismaRepositories } from '@/app/repositories/prisma/account-prisma-repositories'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthenticationUseCase() {
  const accountRepository = new AccountPrismaRepositories()

  const authenticationUseCase = new AuthenticationUseCase(accountRepository)

  return authenticationUseCase
}
