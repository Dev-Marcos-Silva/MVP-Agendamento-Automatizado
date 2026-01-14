import type { Datetime, Prisma } from '@prisma/client'

export interface DateTimeRepository {
  
  createDateTime(data: Prisma.DatetimeCreateInput): Promise<Datetime | null>

  findById(dateTimeId: string): Promise<Datetime | null>
  
  updateDate(dateTime: Datetime): Promise<Datetime | null>

  updateTime(dateTime: Datetime): Promise<Datetime | null>

}
