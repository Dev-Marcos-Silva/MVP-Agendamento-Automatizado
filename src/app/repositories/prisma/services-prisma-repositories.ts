import type { Prisma, Services } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ServicesRepository } from '../services-repositories'

export class ServicesPrismaRepositories implements ServicesRepository {
  async createServices(data: Prisma.ServicesCreateInput) {
    const service = await prisma.services.create({ data })

    return service
  }

  async updateServices(services: Services) {
    const { id, name, description, price } = services

    const newServices = await prisma.services.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
      },
    })

    return newServices
  }

  async findById(serviceId: string) {
    const service = await prisma.services.findUnique({
      where: {
        id: serviceId,
      },
    })

    return service
  }

  async findByMany() {
    const services = await prisma.services.findMany()

    return services
  }
}
