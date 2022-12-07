export function DateFetcher() {
  let todaysDate = new Date()
  let date = todaysDate.toISOString().substring(0, 10)
  return date
}

export function DateFormatter(oldDate: string) {
  let date = oldDate.substring(0, 10)
  return date
}
