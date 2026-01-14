import type { Datetime } from '@prisma/client'
import type { DateTimeRepository } from '../repositories/datatime-repositories'
import { DateTimeNotFoundError } from './err/date-time-not-found-error'

interface EditTimeUseCaseRequest {
  dateTimeId: string
  startTime: string
  endTime: string
}

interface EditTimeUseCaseResponse {
  newDateTime: Datetime
}

export class EditTimeUseCase {
  constructor(private dateTimeRepository: DateTimeRepository) {}

  async execute({
    dateTimeId,
    startTime,
    endTime
  }: EditTimeUseCaseRequest): Promise<EditTimeUseCaseResponse> {

    const dateTime = await this.dateTimeRepository.findById(dateTimeId)

    if (!dateTime) {
      throw new DateTimeNotFoundError()
    }

    dateTime.startTime = startTime
    dateTime.endTime = endTime

    const newDateTime = await this.dateTimeRepository.updateTime(dateTime)

    if (!newDateTime) {
      throw new DateTimeNotFoundError()
    }

    return {
      newDateTime,
    }
  }
}
