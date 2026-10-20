import { dots } from "./dots"
import type {
  AttributeSummary,
  ConnectorSummary,
  DotEntry,
  SentimentCounts,
  UserSummary,
} from "./types"

const emptyCounts = (): SentimentCounts => ({ thumbsUp: 0, ok: 0, loop: 0 })

const addSentiment = (
  counts: SentimentCounts,
  sentiment: DotEntry["details"][number]["sentiment"]
) => {
  if (sentiment === "thumbs_up") counts.thumbsUp += 1
  else if (sentiment === "ok") counts.ok += 1
  else counts.loop += 1
}

const countDetails = (entries: DotEntry[]) => {
  const sentiments = emptyCounts()
  entries.forEach((entry) =>
    entry.details.forEach((detail) =>
      addSentiment(sentiments, detail.sentiment)
    )
  )
  return sentiments
}

const groupBy = (entries: DotEntry[], keyOf: (entry: DotEntry) => string) => {
  const groups = new Map<string, DotEntry[]>()
  entries.forEach((entry) => {
    const key = keyOf(entry)
    const group = groups.get(key)
    if (group) group.push(entry)
    else groups.set(key, [entry])
  })
  return groups
}

const topConnectors = (
  entries: DotEntry[],
  counterpart: (entry: DotEntry) => string,
  limit: number
): ConnectorSummary[] =>
  [...groupBy(entries, counterpart).entries()]
    .map(([userId, group]) => ({
      userId,
      total: group.length,
      sentiments: countDetails(group),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)

const topAttributes = (
  entries: DotEntry[],
  limit: number
): AttributeSummary[] => {
  const groups = new Map<string, SentimentCounts>()
  const totals = new Map<string, number>()
  entries.forEach((entry) =>
    entry.details.forEach((detail) => {
      const counts = groups.get(detail.labelId) ?? emptyCounts()
      addSentiment(counts, detail.sentiment)
      groups.set(detail.labelId, counts)
      totals.set(detail.labelId, (totals.get(detail.labelId) ?? 0) + 1)
    })
  )
  return [...totals.entries()]
    .map(([labelId, total]) => ({
      labelId,
      total,
      sentiments: groups.get(labelId) ?? emptyCounts(),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}

const lastAt = (entries: DotEntry[]): string | null =>
  entries.reduce<string | null>(
    (latest, entry) =>
      latest === null || entry.createdAt > latest ? entry.createdAt : latest,
    null
  )

export const getSummary = (userId: string): UserSummary => {
  const received = dots.filter((dot) => dot.receiverId === userId)
  const given = dots.filter((dot) => dot.giverId === userId)

  return {
    userId,
    received: { total: received.length, lastAt: lastAt(received) },
    given: { total: given.length, lastAt: lastAt(given) },
    topReceivedFrom: topConnectors(received, (dot) => dot.giverId, 4),
    topGivenTo: topConnectors(given, (dot) => dot.receiverId, 4),
    topAttributesReceived: topAttributes(received, 6),
    topAttributesGiven: topAttributes(given, 6),
  }
}
