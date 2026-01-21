import type { Services } from '@prisma/client'
import type { ServicesRepository } from '../repositories/services-repositories'
import { ServiceNotFoundError } from './err/service-not-found-error'

interface EditServicesUseCaseRequest {
  servicesId: string
  name: string
  description: string
  price: string
}

interface EditServicesUseCaseResponse {
  newServices: Services
}

export class EditServicesUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    servicesId,
    name,
    description,
    price,
  }: EditServicesUseCaseRequest): Promise<EditServicesUseCaseResponse> {
    const service = await this.servicesRepository.findById(servicesId)

    if (!service) {
      throw new ServiceNotFoundError()
    }

    service.name = name
    service.description = description
    service.price = price

    const newServices = await this.servicesRepository.updateServices(service)

    if (!newServices) {
      throw new ServiceNotFoundError()
    }

    return {
      newServices,
    }
  }
}
