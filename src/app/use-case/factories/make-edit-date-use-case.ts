import { DateTimePrismaRepositories } from "@/app/repositories/prisma/datetime-prisma-repositories";
import { EditDateUseCase } from "../edit-date";

export function makeEditDateUseCase(){

    const dateTimeRepository = new DateTimePrismaRepositories()

    const editDateUseCase = new EditDateUseCase(dateTimeRepository)

    return editDateUseCase

}