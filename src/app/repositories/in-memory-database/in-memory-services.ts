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
}
