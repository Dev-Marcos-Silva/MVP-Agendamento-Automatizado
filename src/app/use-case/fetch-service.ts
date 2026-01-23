import type { ServicesRepository } from '../repositories/services-repositories'

export interface FetchServicesUseCaseResponse {
  services:
    {
      id: string
      name: string
      description: string
      price: string
    }[] | null
}

export class FetchServicesUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute(): Promise<FetchServicesUseCaseResponse> {
    const services = await this.servicesRepository.findByMany()

    if (!services) {
      return {
        services: null,
      }
    }

    const newServices = services.map((service) => {
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
      }
    })

    return {
      services: newServices,
    }
  }
}
