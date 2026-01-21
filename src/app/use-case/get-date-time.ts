import type { $Enums } from '@prisma/client'
import { createTimes, type TimeSlot } from '@/utils/create-times-day'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import type { DateTimeRepository } from '../repositories/datetime-repositories'

export interface GetDateTimeUseCaseResponse {
  dateTime:
    {
        date: string
        status: $Enums.Active
        times: TimeSlot[]
      }[]
    | null
}

export class GetDateTimeUseCase {
  constructor(
    private dateTimeRepository: DateTimeRepository,
    private appointmentRepository: AppointmentRepository,
  ) {}

  async execute(): Promise<GetDateTimeUseCaseResponse> {
    const dateTime = await this.dateTimeRepository.findByMany()

    if (!dateTime) {
      return {
        dateTime: null,
      }
    }

    const newDateTime = await Promise.all(
      dateTime.map(async (item) => {
        const date = item.day
        const status = item.dayStatus
        const times = await createTimes(item.startTime, item.endTime)

        const resolvedTimes = await Promise.all(
          times.map(async (time) => {
            const appointment =
              await this.appointmentRepository.findAppointment(
                date,
                time.start,
                time.end,
              )

            if (appointment?.status === 'scheduled') {
              return null
            }

            return time
          }),
        )

        const availableTimes = resolvedTimes.filter(
          (time): time is TimeSlot => time !== null,
        )

        return {
          date,
          status,
          times: availableTimes,
        }
      }),
    )

    return {
      dateTime: newDateTime,
    }
  }
}
