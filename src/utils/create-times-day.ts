import { formatTime } from './format-time'

export interface TimeSlot {
  start: string
  end: string
}

export async function createTimes(
  startTime: string,
  endTime: string,
): Promise<TimeSlot[]> {
  const times: TimeSlot[] = []

  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  let currentMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute

  const SLOT_DURATION = 30 // minutos

  while (currentMinutes + SLOT_DURATION <= endMinutes) {
    const start = formatTime(currentMinutes)
    const end = formatTime(currentMinutes + SLOT_DURATION)

    times.push({ start, end })

    currentMinutes += SLOT_DURATION
  }

  return times
}
