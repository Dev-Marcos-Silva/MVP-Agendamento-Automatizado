import { randomUUID } from 'node:crypto'
import type { Prisma, Services } from '@prisma/client'
import type { ServicesRepository } from '../services-repositories'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Services[] = []

  async createServices({
    id,
    account,
    name,
    description,
    price,
  }: Prisma.ServicesCreateInput) {
    const accountId = account.connect?.id

    if (!accountId) {
      return null
    }

    const services = {
      id: id ?? randomUUID(),
      accountId,
      name,
      description,
      price,
    }

    this.items.push(services)

    return services
  }

  async updateServices(services: Services) {
    const servicesIndex = this.items.findIndex(
      (item) => item.id === services.id,
    )

    this.items[servicesIndex] = services

    const newServices = this.items.find((item) => item.id === services.id)

    if (!newServices) {
      return null
    }

    return newServices
  }

  async findById(serviceId: string) {
    const service = this.items.find((item) => item.id === serviceId)

    if (!service) {
      return null
    }

    return service
  }

  async findByMany() {
    const services = this.items

    return services
  }
}
