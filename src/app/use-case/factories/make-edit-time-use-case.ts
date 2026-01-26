import { DateTimePrismaRepositories } from '@/app/repositories/prisma/datetime-prisma-repositories'
import { EditTimeUseCase } from '../edit-time'

export function makeEditTimeUseCase() {
  const dateTimeRepository = new DateTimePrismaRepositories()

  const editTimeUseCase = new EditTimeUseCase(dateTimeRepository)

  return editTimeUseCase
}
