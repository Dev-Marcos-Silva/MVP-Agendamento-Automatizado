import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ServicesRepository } from '../services-repositories'

export class ServicesPrismaRepositories implements ServicesRepository {
  async createServices(data: Prisma.ServicesCreateInput) {
    const service = await prisma.services.create({ data })

    return service
  }

  async findById(serviceId: string) {
    const service = await prisma.services.findUnique({
      where: {
        id: serviceId,
      },
    })

    return service
  }
}
