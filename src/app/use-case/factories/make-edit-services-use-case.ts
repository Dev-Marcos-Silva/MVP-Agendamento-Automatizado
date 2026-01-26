import { ServicesPrismaRepositories } from '@/app/repositories/prisma/services-prisma-repositories'
import { EditServicesUseCase } from '../edit-services'

export function makeEditServicesUseCase() {
  const servicesRepository = new ServicesPrismaRepositories()

  const editServicesUseCase = new EditServicesUseCase(servicesRepository)

  return editServicesUseCase
}
