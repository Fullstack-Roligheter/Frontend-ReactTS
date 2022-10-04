
export function DateFetcher() {
    let todaysDate = new Date()
    let date = todaysDate.toISOString().substring(0, 10)
    return date
  }