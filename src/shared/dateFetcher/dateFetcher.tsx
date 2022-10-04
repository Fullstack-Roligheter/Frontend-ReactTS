
export function DateFetcher() {
    var curr = new Date()
    curr.setDate(curr.getDate())
    var date = curr.toISOString().substring(0, 10)
    return date
  }