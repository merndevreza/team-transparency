import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import type { NotificationItem } from "./types"

interface NotificationRow {
  id: string
  actor_id: string
  kind: NotificationItem["kind"]
  is_read: boolean
  created_at: string
  actor: { full_name: string } | null
  dot: { comment: string } | null
}

const excerpt = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text

const composePreview = (row: NotificationRow): string => {
  const actorName = row.actor?.full_name ?? "Someone"
  if (row.kind === "dot_received" && row.dot) {
    return `${actorName} sent you a dot: “${excerpt(row.dot.comment, 48)}”`
  }
  if (row.kind === "member_joined") {
    return `${actorName} joined the workspace`
  }
  return `${actorName} changed workspace settings`
}

export const getNotifications = async (): Promise<NotificationItem[]> => {
  const supabase = createClient(await cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("notifications")
    .select(
      "id, actor_id, kind, is_read, created_at, actor:profiles!notifications_actor_id_fkey(full_name), dot:dots(comment)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20)
  if (!data) return []

  return (data as unknown as NotificationRow[]).map((row) => ({
    id: row.id,
    actorId: row.actor_id,
    kind: row.kind,
    createdAt: row.created_at,
    preview: composePreview(row),
    read: row.is_read,
  }))
}
