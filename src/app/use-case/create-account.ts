import { hash } from 'bcryptjs'
import type { AccountRepository } from '../repositories/account-repositories'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest){
    const passwordHash = await hash(password, 6)

    await this.accountRepository.createAccount({
      name,
      email,
      password: passwordHash,
    })
  }
}
