import { compare } from 'bcryptjs'
import type { AccountRepository } from '../repositories/account-repositories'
import { InvalidCredentialsError } from './err/invalid-crendentials-error'

interface AuthenticationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticationUseCaseResponse {
  account: {
    id: string
    name: string
    email: string
  }
}

export class AuthenticationUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
    const account = await this.accountRepository.findByEmail(email)

    if (!account) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, account.password)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
      },
    }
  }
}
