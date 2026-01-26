import { InMemoryServicesRepository } from '../repositories/in-memory-database/in-memory-services'
import { EditServicesUseCase } from './edit-services'
import { ServiceNotFoundError } from './err/service-not-found-error'

let inMemoryServicesRepository: InMemoryServicesRepository
let sut: EditServicesUseCase

describe('Update A Service.', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new EditServicesUseCase(inMemoryServicesRepository)
  })

  it('It should be possible to update a service.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: { id: 'account-1' },
      },
      id: 'service-1',
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00',
    })

    const result = await sut.execute({
      servicesId: 'service-1',
      name: 'fazer a barba',
      description: 'descrição do serviço',
      price: '20,00',
    })

    expect(result.newServices.id).toEqual('service-1')
    expect(result.newServices.name).toEqual('fazer a barba')
    expect(result.newServices.price).toEqual('20,00')
  })

  it('It should not be possible to update a service.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: { id: 'account-1' },
      },
      id: 'service-1',
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00',
    })

    await expect(
      sut.execute({
        servicesId: 'account-2',
        name: 'fazer a barba',
        description: 'descrição do serviço',
        price: '20,00',
      }),
    ).rejects.instanceOf(ServiceNotFoundError)
  })
})
