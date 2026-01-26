import { makeCreateAppointmentUseCase } from '@/app/use-case/factories/make-create-appointment-use-case'
import { add30Minutes } from '@/utils/add-30-min'
import type { AiData, AiResult } from './aiInterpretation'

const fields: (keyof AiData)[] = [
  'appointmentId',
  'client',
  'phone',
  'date',
  'startTime',
  'endTime',
  'serviceId',
  'status',
]

export async function aiDispatcher(dataIa: AiResult) {
  const { intent, data } = dataIa

  if (!data) {
    return 'Sem dados'
  }

  switch (intent) {
    case 'CREATE_APPOINTMENT': {

      const missing: string[] = []

      data.status = 'scheduled'
      if (data.startTime) {
        data.endTime = add30Minutes(data.startTime)
      }

      for (const field of fields) {
        if (data[field] === null) {
          if (field !== 'appointmentId') {
            missing.push(field)
          }
        }
      }

      if(missing.length > 0){
        return missing
      }
       
      const createAppointmentUseCase = makeCreateAppointmentUseCase()

      const result = await createAppointmentUseCase.execute({ 
        client: data.client as string,
        phone: data.phone as string,
        date: data.date as string,
        startTime: data.startTime as string,
        endTime: data.endTime as string,
        serviceId: data.serviceId as string,
        status: 'scheduled'
      })

      return result
    }

    case 'CANCEL_APPOINTMENT':
      console.log(data)
      break
    case 'GET_APPOINTMENT':
      console.log(data)
      break
    case 'LIST_SERVICES':
      console.log(data)
      break
    case 'LIST_TIMES':
      console.log(data)
      break
    case 'UNKNOWN':
      console.log(data)
      break
    default:
      console.warn('Intent desconhecida:', intent)
  }
}
