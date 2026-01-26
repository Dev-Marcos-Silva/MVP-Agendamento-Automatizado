import { ServicesPrismaRepositories } from '@/app/repositories/prisma/services-prisma-repositories'
import { FetchServicesUseCase } from '../fetch-service'

export function makeFetchServicesUseCase() {
  const servicesRepository = new ServicesPrismaRepositories()

  const fetchServicesUseCase = new FetchServicesUseCase(servicesRepository)

  return fetchServicesUseCase
}
