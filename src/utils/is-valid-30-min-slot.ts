export function isValid30MinSlot(startTime: string, endTime: string): boolean {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)

  const start = sh * 60 + sm
  const end = eh * 60 + em

  return end - start === 30
}
