import type { Datetime, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { DateTimeRepository } from '../datetime-repositories'

export class DateTimePrismaRepositories implements DateTimeRepository {
  async createDateTime(data: Prisma.DatetimeCreateInput) {
    const dateTime = await prisma.datetime.create({ data })

    return dateTime
  }

  async findById(dateTimeId: string) {
    const dateTime = await prisma.datetime.findUnique({
      where: {
        id: dateTimeId,
      },
    })

    return dateTime
  }

  async findByMany() {
    const dateTimes = await prisma.datetime.findMany()

    return dateTimes
  }

  async updateDate(dateTime: Datetime) {
    const { id, dayStatus } = dateTime

    const newDateTime = await prisma.datetime.update({
      where: {
        id,
      },
      data: {
        dayStatus,
      },
    })

    return newDateTime
  }

  async findByDay(day: string) {
    const dateTime = await prisma.datetime.findUnique({
      where: {
        day,
      },
    })

    return dateTime
  }

  async updateTime(dateTime: Datetime) {
    const { id, startTime, endTime } = dateTime

    const newDateTime = await prisma.datetime.update({
      where: {
        id,
      },
      data: {
        startTime,
        endTime,
      },
    })

    return newDateTime
  }
}
