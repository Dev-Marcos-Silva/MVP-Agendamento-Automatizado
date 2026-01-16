import { AppointmentPrismaRepositories } from "@/app/repositories/prisma/appointment-prisma-repositories";
import { EditAppointmentUseCase } from "../edit-appointment";

export function makeEditAppointmentUseCase(){

    const appointmentRepository = new AppointmentPrismaRepositories()

    const editAppointmentUseCase = new EditAppointmentUseCase(appointmentRepository)

    return editAppointmentUseCase

}