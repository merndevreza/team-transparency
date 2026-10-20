import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { DotEntry, DotQuality, Sentiment } from "./types"

interface DotRow {
  id: string
  giver_id: string
  receiver_id: string
  created_at: string
  comment: string
  quality: DotQuality | null
  dot_details: { label_id: string; sentiment: Sentiment }[] | null
}

const SELECT =
  "id, giver_id, receiver_id, created_at, comment, quality, dot_details(label_id, sentiment)"

const mapDot = (row: DotRow): DotEntry => ({
  id: row.id,
  giverId: row.giver_id,
  receiverId: row.receiver_id,
  createdAt: row.created_at,
  comment: row.comment,
  quality: row.quality,
  details: (row.dot_details ?? []).map((detail) => ({
    labelId: detail.label_id,
    sentiment: detail.sentiment,
  })),
})

const byNewestFirst = (a: DotEntry, b: DotEntry) =>
  b.createdAt.localeCompare(a.createdAt)

export const getReceivedDots = async (userId: string): Promise<DotEntry[]> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dots")
    .select(SELECT)
    .eq("receiver_id", userId)
  if (!data) return []

  return data.map(mapDot).sort(byNewestFirst)
}

export const getGivenDots = async (userId: string): Promise<DotEntry[]> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dots")
    .select(SELECT)
    .eq("giver_id", userId)
  if (!data) return []

  return data.map(mapDot).sort(byNewestFirst)
}

export const getDotById = async (id: string): Promise<DotEntry | null> => {
  const supabase = createClient(await cookies())
  const { data } = await supabase
    .from("dots")
    .select(SELECT)
    .eq("id", id)
    .single()
  if (!data) return null

  return mapDot(data as DotRow)
}
