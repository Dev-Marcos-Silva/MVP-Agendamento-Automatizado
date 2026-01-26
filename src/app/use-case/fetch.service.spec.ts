import { InMemoryServicesRepository } from '../repositories/in-memory-database/in-memory-services'
import { FetchServicesUseCase } from './fetch-service'

let inMemoryServicesRepository: InMemoryServicesRepository
let sut: FetchServicesUseCase

describe('Get All Services.', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new FetchServicesUseCase(inMemoryServicesRepository)
  })

  it('It should be possible to get all services.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: { id: 'account-1' },
      },
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00',
    })

    await inMemoryServicesRepository.createServices({
      account: {
        connect: { id: 'account-1' },
      },
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00',
    })

    await inMemoryServicesRepository.createServices({
      account: {
        connect: { id: 'account-1' },
      },
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00',
    })

    const result = await sut.execute()

    expect(result.services).toHaveLength(3)
  })
})
