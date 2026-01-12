import type { Datetime } from '@prisma/client'
import type { AccountRepository } from '../repositories/account-repositories'
import type { DateTimeRepository } from '../repositories/datatime-repositories'
import { AccountNotFoundError } from './err/account-not-found-error'

interface CreateDateTimeUseCaseRequest {
  accountId: string
  day: string
  startTime: string
  endTime: string
  dayStatus: 'true' | 'false'
}

interface CreateDateTimeUseCaseResponse {
  dateTime: Datetime | null
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

    const dateTime = await this.dateTimeRepository.createDateTime({
      account: {
        connect: {id: account.id}
      },
      day,
      startTime,
      endTime,
      dayStatus,
    })

    return {
      dateTime,
    }
  }
}
