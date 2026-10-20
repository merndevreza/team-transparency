import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type {
  AttributeSummary,
  ConnectorSummary,
  SentimentCounts,
  UserSummary,
} from "./types"

interface SummaryDot {
  giverId: string
  receiverId: string
  createdAt: string
  details: { labelId: string; sentiment: "thumbs_up" | "ok" | "loop" }[]
}

const emptyCounts = (): SentimentCounts => ({ thumbsUp: 0, ok: 0, loop: 0 })

const addSentiment = (
  counts: SentimentCounts,
  sentiment: SummaryDot["details"][number]["sentiment"]
) => {
  if (sentiment === "thumbs_up") counts.thumbsUp += 1
  else if (sentiment === "ok") counts.ok += 1
  else counts.loop += 1
}

const countDetails = (entries: SummaryDot[]) => {
  const sentiments = emptyCounts()
  entries.forEach((entry) =>
    entry.details.forEach((detail) =>
      addSentiment(sentiments, detail.sentiment)
    )
  )
  return sentiments
}

const groupBy = (
  entries: SummaryDot[],
  keyOf: (entry: SummaryDot) => string
) => {
  const groups = new Map<string, SummaryDot[]>()
  entries.forEach((entry) => {
    const key = keyOf(entry)
    const group = groups.get(key)
    if (group) group.push(entry)
    else groups.set(key, [entry])
  })
  return groups
}

const topConnectors = (
  entries: SummaryDot[],
  counterpart: (entry: SummaryDot) => string,
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
  entries: SummaryDot[],
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

const lastAt = (entries: SummaryDot[]): string | null =>
  entries.reduce<string | null>(
    (latest, entry) =>
      latest === null || entry.createdAt > latest ? entry.createdAt : latest,
    null
  )

export const getSummary = async (userId: string): Promise<UserSummary> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dots")
    .select(
      "giver_id, receiver_id, created_at, dot_details(label_id, sentiment)"
    )
    .or(`receiver_id.eq.${userId},giver_id.eq.${userId}`)

  const all: SummaryDot[] = (data ?? []).map((row) => ({
    giverId: row.giver_id,
    receiverId: row.receiver_id,
    createdAt: row.created_at,
    details: (row.dot_details ?? []).map((detail) => ({
      labelId: detail.label_id,
      sentiment: detail.sentiment,
    })),
  }))
  const received = all.filter((dot) => dot.receiverId === userId)
  const given = all.filter((dot) => dot.giverId === userId)

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
