import { AccountPrismaRepositories } from '@/app/repositories/prisma/account-prisma-repositories'
import { DateTimePrismaRepositories } from '@/app/repositories/prisma/datetime-prisma-repositories'
import { CreateDateTimeUseCase } from '../create-date-time'

export function makeCreateDateTimeUseCase() {
  const dateTimeRepository = new DateTimePrismaRepositories()

  const accountRepository = new AccountPrismaRepositories()

  const createDateTimeUseCase = new CreateDateTimeUseCase(
    dateTimeRepository,
    accountRepository,
  )

  return createDateTimeUseCase
}
