import { randomUUID } from 'node:crypto'
import type { Datetime, Prisma } from '@prisma/client'
import type { DateTimeRepository } from '../datatime-repositories'

export class InMemoryDateTimeRepository implements DateTimeRepository {
  public items: Datetime[] = []

  async createDateTime({
    id,
    account,
    day,
    startTime,
    endTime,
    dayStatus,
  }: Prisma.DatetimeCreateInput) {
    const accountId = account.connect?.id

    if (!accountId) {
      return null
    }

    if (dayStatus === undefined) {
      return null
    }

    const dateTime = {
      id: id ?? randomUUID(),
      accountId,
      day,
      startTime,
      endTime,
      dayStatus,
    }

    this.items.push(dateTime)

    return dateTime
  }
}
