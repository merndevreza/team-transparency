import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { listProfiles } from "./profiles"
import type {
  DashboardData,
  DashboardSide,
  LeaderRow,
  MonthlyPoint,
  SentimentCounts,
} from "./types"

const DAY_MS = 24 * 60 * 60 * 1000

const daysSince = (iso: string): number =>
  Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / DAY_MS))

const emptyCounts = (): SentimentCounts => ({ thumbsUp: 0, ok: 0, loop: 0 })

const buildSide = (
  direction: "given" | "received",
  dots: {
    giverId: string
    receiverId: string
    createdAt: string
    sentiments: SentimentCounts
  }[],
  activeProfileIds: string[],
  profileJoinAt: Record<string, string>
): DashboardSide => {
  const actorId = (dot: { giverId: string; receiverId: string }) =>
    direction === "given" ? dot.giverId : dot.receiverId

  const perUser = new Map<
    string,
    { count: number; latest: string; sentiments: SentimentCounts }
  >()
  dots.forEach((dot) => {
    const id = actorId(dot)
    const entry = perUser.get(id) ?? {
      count: 0,
      latest: "",
      sentiments: emptyCounts(),
    }
    entry.count += 1
    if (dot.createdAt > entry.latest) entry.latest = dot.createdAt
    entry.sentiments.thumbsUp += dot.sentiments.thumbsUp
    entry.sentiments.ok += dot.sentiments.ok
    entry.sentiments.loop += dot.sentiments.loop
    perUser.set(id, entry)
  })

  const longestSilent = activeProfileIds
    .map((id) => {
      const entry = perUser.get(id)
      const lastAt = entry?.latest || profileJoinAt[id]
      return { userId: id, daysSince: daysSince(lastAt) }
    })
    .sort((a, b) => b.daysSince - a.daysSince)
    .slice(0, 5)

  const mostRecent = activeProfileIds
    .filter((id) => perUser.has(id))
    .map((id) => {
      const entry = perUser.get(id)!
      return {
        userId: id,
        daysSince: daysSince(entry.latest),
        at: entry.latest,
      }
    })
    .sort((a, b) => a.daysSince - b.daysSince)
    .slice(0, 5)

  const now = new Date()
  const months: MonthlyPoint[] = []
  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1)
    )
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`
    const count = dots.filter((dot) => dot.createdAt.startsWith(key)).length
    months.push({ month: key, given: count, received: count })
  }

  const leaders: LeaderRow[] = [...perUser.entries()]
    .map(([userId, entry]) => ({
      userId,
      total: entry.count,
      sentiments: entry.sentiments,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  const silentMembers = activeProfileIds.filter((id) => {
    const entry = perUser.get(id)
    return !entry || daysSince(entry.latest) > 30
  }).length

  return {
    stats: {
      totalDots: dots.length,
      activeMembers: activeProfileIds.length,
      avgPerMember:
        Math.round((dots.length / Math.max(1, activeProfileIds.length)) * 10) /
        10,
      silentMembers,
    },
    longestSilent,
    mostRecent,
    monthly: months,
    leaders,
  }
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const supabase = createClient(await cookies())
  const [{ data: dotRows }, profiles] = await Promise.all([
    supabase
      .from("dots")
      .select("giver_id, receiver_id, created_at, dot_details(sentiment)"),
    listProfiles(),
  ])

  const dots = (dotRows ?? []).map((row) => {
    const sentiments = emptyCounts()
    ;(row.dot_details ?? []).forEach((detail) => {
      if (detail.sentiment === "thumbs_up") sentiments.thumbsUp += 1
      else if (detail.sentiment === "ok") sentiments.ok += 1
      else sentiments.loop += 1
    })
    return {
      giverId: row.giver_id,
      receiverId: row.receiver_id,
      createdAt: row.created_at,
      sentiments,
    }
  })

  const active = profiles.filter((profile) => profile.status === "active")
  const activeProfileIds = active.map((profile) => profile.id)
  const profileJoinAt = Object.fromEntries(
    profiles.map((profile) => [profile.id, profile.joinedAt])
  )

  return {
    given: buildSide("given", dots, activeProfileIds, profileJoinAt),
    received: buildSide("received", dots, activeProfileIds, profileJoinAt),
  }
}
