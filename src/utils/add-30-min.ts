export function add30Minutes(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error('Hora inválida. Use o formato HH:MM')
  }

  const totalMinutes = hours * 60 + minutes + 30

  const newHours = Math.floor((totalMinutes / 60) % 24)
  const newMinutes = totalMinutes % 60

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
}