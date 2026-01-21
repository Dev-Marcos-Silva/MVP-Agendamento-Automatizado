import type { Prisma, Services } from '@prisma/client'

export interface ServicesRepository {
  
  createServices(data: Prisma.ServicesCreateInput): Promise<Services | null>

  updateServices(services: Services): Promise<Services | null>

  findById(serviceId: string): Promise<Services | null>
}
