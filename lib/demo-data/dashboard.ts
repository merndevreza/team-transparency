import { dots } from "./dots"
import { users } from "./users"
import type {
  DashboardData,
  DashboardSide,
  LeaderRow,
  MonthlyPoint,
  SentimentCounts,
} from "./types"

// Fixed reference so demo "days since" numbers are deterministic on every render.
export const REFERENCE_NOW = "2026-10-20T12:00:00Z"

const DAY_MS = 24 * 60 * 60 * 1000

const daysSince = (iso: string): number =>
  Math.max(
    0,
    Math.floor((Date.parse(REFERENCE_NOW) - Date.parse(iso)) / DAY_MS)
  )

const emptyCounts = (): SentimentCounts => ({ thumbsUp: 0, ok: 0, loop: 0 })

const buildSide = (direction: "given" | "received"): DashboardSide => {
  const actorId = direction === "given" ? "giverId" : "receiverId"

  const perUser = new Map<
    string,
    { count: number; latest: string; sentiments: SentimentCounts }
  >()
  dots.forEach((dot) => {
    const id = dot[actorId]
    const entry = perUser.get(id) ?? {
      count: 0,
      latest: "",
      sentiments: emptyCounts(),
    }
    entry.count += 1
    if (dot.createdAt > entry.latest) entry.latest = dot.createdAt
    dot.details.forEach((detail) => {
      if (detail.sentiment === "thumbs_up") entry.sentiments.thumbsUp += 1
      else if (detail.sentiment === "ok") entry.sentiments.ok += 1
      else entry.sentiments.loop += 1
    })
    perUser.set(id, entry)
  })

  const activeUsers = users.filter(
    (user) => user.status === "active" && user.id !== "u-12"
  )

  const longestSilent = activeUsers
    .map((user) => {
      const entry = perUser.get(user.id)
      const lastAt = entry?.latest ?? user.joinedAt
      return { userId: user.id, daysSince: daysSince(lastAt) }
    })
    .sort((a, b) => b.daysSince - a.daysSince)
    .slice(0, 5)

  const mostRecent = activeUsers
    .filter((user) => perUser.has(user.id))
    .map((user) => {
      const entry = perUser.get(user.id)!
      return {
        userId: user.id,
        daysSince: daysSince(entry.latest),
        at: entry.latest,
      }
    })
    .sort((a, b) => a.daysSince - b.daysSince)
    .slice(0, 5)

  const months: MonthlyPoint[] = []
  const reference = new Date(REFERENCE_NOW)
  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(
      Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth() - offset, 1)
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

  const totalDots = dots.length
  const silentMembers = activeUsers.filter((user) => {
    const entry = perUser.get(user.id)
    return !entry || daysSince(entry.latest) > 30
  }).length

  return {
    stats: {
      totalDots,
      activeMembers: activeUsers.length,
      avgPerMember: Math.round((totalDots / activeUsers.length) * 10) / 10,
      silentMembers,
    },
    longestSilent,
    mostRecent,
    monthly: months,
    leaders,
  }
}

export const getDashboardData = (): DashboardData => ({
  given: buildSide("given"),
  received: buildSide("received"),
})
