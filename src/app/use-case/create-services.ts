import type { Services } from '@prisma/client'
import type { AccountRepository } from '../repositories/account-repositories'
import type { ServicesRepository } from '../repositories/services-repositories'
import { AccountNotFoundError } from './err/account-not-found-error'

interface CreateServicesUseCaseRequest {
  accountId: string
  name: string
  description: string
  price: string
}

interface CreateServicesUseCaseResponse {
  services: Services | null
}

export class CreateServicesUseCase {
  constructor(
    private servicesRepository: ServicesRepository,
    private accountRepository: AccountRepository,
  ) {}

  async execute({
    accountId,
    name,
    description,
    price,
  }: CreateServicesUseCaseRequest): Promise<CreateServicesUseCaseResponse> {

    const account = await this.accountRepository.findById(accountId)
    
    if (!account) {
        throw new AccountNotFoundError()
    }

    const services = await this.servicesRepository.createServices({
      account: {
        connect: { id: account.id },
      },
      name,
      description,
      price,
    })

    return {
      services,
    }
  }
}
