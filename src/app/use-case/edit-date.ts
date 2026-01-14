import type { Datetime } from '@prisma/client'
import type { DateTimeRepository } from '../repositories/datatime-repositories'
import { DateTimeNotFoundError } from './err/date-time-not-found-error'

interface EditDateUseCaseRequest {
  dateTimeId: string
  dayStatus: 'true' | 'false'
}

interface EditDateUseCaseResponse {
  newDateTime: Datetime
}

export class EditDateUseCase {
  constructor(private dateTimeRepository: DateTimeRepository) {}

  async execute({
    dateTimeId,
    dayStatus,
  }: EditDateUseCaseRequest): Promise<EditDateUseCaseResponse> {
    const dateTime = await this.dateTimeRepository.findById(dateTimeId)

    if (!dateTime) {
      throw new DateTimeNotFoundError()
    }

    dateTime.dayStatus = dayStatus

    const newDateTime = await this.dateTimeRepository.updateDate(dateTime)

    if (!newDateTime) {
      throw new DateTimeNotFoundError()
    }

    return {
      newDateTime,
    }
  }
}
