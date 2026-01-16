import { AppointmentPrismaRepositories } from "@/app/repositories/prisma/appointment-prisma-repositories"
import { ServicesPrismaRepositories } from "@/app/repositories/prisma/services-prisma-repositories"
import { CreateAppointmentUseCase } from "../create-appointment"

export function makeCreateAppointmentUseCase(){

    const appointmentRepository = new AppointmentPrismaRepositories()

    const servicesRepository = new ServicesPrismaRepositories()

    const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository, servicesRepository)

    return createAppointmentUseCase
}