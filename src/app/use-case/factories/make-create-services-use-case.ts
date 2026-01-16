import { AccountPrismaRepositories } from "@/app/repositories/prisma/account-prisma-repositories"
import { ServicesPrismaRepositories } from "@/app/repositories/prisma/services-prisma-repositories"
import { CreateServicesUseCase } from "../create-services"

export function makeCreateServicesUseCase(){

    const servicesRepository = new ServicesPrismaRepositories()

    const accountRepository = new AccountPrismaRepositories()

    const createServicesUseCase = new CreateServicesUseCase(servicesRepository, accountRepository)

    return createServicesUseCase
}