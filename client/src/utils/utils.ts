export const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const createdAt = new Date(timestamp)
  const diff = now.getTime() - createdAt.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return `${Math.floor(diff / 1000)} seconds ago`
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`
  } else if (diff < week) {
    return `${Math.floor(diff / day)} days ago`
  } else if (diff < month) {
    return `${Math.floor(diff / week)} weeks ago`
  } else if (diff < year) {
    return `${Math.floor(diff / month)} months ago`
  } else {
    return `${Math.floor(diff / year)} years ago`
  }
}

export function getFirstTwoLines(content: string) {
  const lines = content.split('.')
  const firstTwoLines = lines.slice(0, 2)
  return firstTwoLines.join('. ')
}
