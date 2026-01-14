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

  async findById(dateTimeId: string) {

    const dataTime = this.items.find(item => item.id === dateTimeId)

    if(!dataTime){
      return null
    }

    return dataTime
    
  }

  async updateDate(dateTime: Datetime) {

    const dateTimeIndex = this.items.findIndex(item => item.id === dateTime.id)

    this.items[dateTimeIndex] = dateTime

    const newdateTime = this.items.find(item => item.id === dateTime.id)

    if(!newdateTime){
      return null
    }

    return newdateTime

  }
  async updateTime(dateTime: Datetime) {

    const dateTimeIndex = this.items.findIndex(item => item.id === dateTime.id)

    this.items[dateTimeIndex] = dateTime

    const newdateTime = this.items.find(item => item.id === dateTime.id)

    if(!newdateTime){
      return null
    }

    return newdateTime
  }
}

