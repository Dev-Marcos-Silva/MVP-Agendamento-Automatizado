import type { Appointment } from '@prisma/client'
import type { AccountRepository } from '../repositories/account-repositories'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import { AccountNotFoundError } from './err/account-not-found-error'

interface FetchAppointmentUseCaseRequest {
  accountId: string
}

interface FetchAppointmentUseCaseResponse {
  appointments: Appointment[]
}

export class FetchAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute({
    accountId,
  }: FetchAppointmentUseCaseRequest): Promise<FetchAppointmentUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if (!account) {
      throw new AccountNotFoundError()
    }

    const appointments = await this.appointmentRepository.findByMany()

    return {
      appointments,
    }
  }
}
