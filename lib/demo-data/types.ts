export type Sentiment = "thumbs_up" | "ok" | "loop"

export type UserRole = "admin" | "member"

export type UserStatus = "active" | "inactive"

export type DotQuality = "good" | "bad"

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastLoginAt: string | null
  joinedAt: string
}

export interface DotLabel {
  id: string
  categoryId: string
  name: string
}

export interface DotCategory {
  id: string
  name: string
  labels: DotLabel[]
}

export interface DotEntryDetail {
  labelId: string
  sentiment: Sentiment
}

export interface DotEntry {
  id: string
  giverId: string
  receiverId: string
  createdAt: string
  comment: string
  details: DotEntryDetail[]
  quality: DotQuality
}

export interface SentimentCounts {
  thumbsUp: number
  ok: number
  loop: number
}

export interface ConnectorSummary {
  userId: string
  total: number
  sentiments: SentimentCounts
}

export interface AttributeSummary {
  labelId: string
  total: number
  sentiments: SentimentCounts
}

export interface UserSummary {
  userId: string
  received: { total: number; lastAt: string | null }
  given: { total: number; lastAt: string | null }
  topReceivedFrom: ConnectorSummary[]
  topGivenTo: ConnectorSummary[]
  topAttributesReceived: AttributeSummary[]
  topAttributesGiven: AttributeSummary[]
}

export interface MonthlyPoint {
  month: string
  given: number
  received: number
}

export interface LeaderRow {
  userId: string
  total: number
  sentiments: SentimentCounts
}

export interface DashboardSide {
  stats: {
    totalDots: number
    activeMembers: number
    avgPerMember: number
    silentMembers: number
  }
  longestSilent: { userId: string; daysSince: number }[]
  mostRecent: { userId: string; daysSince: number; at: string }[]
  monthly: MonthlyPoint[]
  leaders: LeaderRow[]
}

export interface DashboardData {
  given: DashboardSide
  received: DashboardSide
}

export interface NotificationItem {
  id: string
  actorId: string
  kind: "dot_received" | "member_joined" | "admin_change"
  createdAt: string
  preview: string
  read: boolean
}
