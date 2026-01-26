import type { Datetime } from '@prisma/client'
import type { AccountRepository } from '../repositories/account-repositories'
import type { DateTimeRepository } from '../repositories/datetime-repositories'
import { AccountNotFoundError } from './err/account-not-found-error'
import { DateTimeAlreadyExistError } from './err/date-time-already-exist-error'
import { DateTimeNotCreatedError } from './err/date-time-not-created-error'

interface CreateDateTimeUseCaseRequest {
  accountId: string
  day: string
  startTime: string
  endTime: string
  dayStatus: 'true' | 'false'
}

interface CreateDateTimeUseCaseResponse {
  dateTime: Datetime
}

export class CreateDateTimeUseCase {
  constructor(
    private dateTimeRepository: DateTimeRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute({
    accountId,
    day,
    dayStatus,
    endTime,
    startTime,
  }: CreateDateTimeUseCaseRequest): Promise<CreateDateTimeUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      throw new AccountNotFoundError()
    }

    const dayExist = await this.dateTimeRepository.findByDay(day)

    if (dayExist) {
      throw new DateTimeAlreadyExistError()
    }

    const dateTime = await this.dateTimeRepository.createDateTime({
      account: {
        connect: { id: account.id },
      },
      day,
      startTime,
      endTime,
      dayStatus,
    })

    if (!dateTime) {
      throw new DateTimeNotCreatedError()
    }

    return {
      dateTime,
    }
  }
}
