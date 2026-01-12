import type { Datetime, Prisma } from '@prisma/client'

export interface DateTimeRepository {
  createDateTime(data: Prisma.DatetimeCreateInput): Promise<Datetime | null>
}
