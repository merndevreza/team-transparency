import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import AppShell from "./_components/AppShell"
import { getCurrentProfile } from "@/lib/data/profiles"
import { getNotifications } from "@/lib/data/notifications"

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const profile = await getCurrentProfile()
  if (!profile) redirect("/login")

  const notifications = await getNotifications()

  return (
    <AppShell profile={profile} notifications={notifications}>
      {children}
    </AppShell>
  )
}
