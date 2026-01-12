import type { Prisma, Services } from '@prisma/client'

export interface ServicesRepository {
  createServices(data: Prisma.ServicesCreateInput): Promise<Services | null>
}
