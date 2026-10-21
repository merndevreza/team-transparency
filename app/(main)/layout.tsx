import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AppShell from "./_components/AppShell"
import { createClient } from "@/utils/supabase/server"
import { getCurrentProfile } from "@/lib/data/profiles"
import { getNotifications } from "@/lib/data/notifications"

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const profile = await getCurrentProfile()
  if (!profile) {
    // Session without a profile (user created before the signup trigger
    // existed). Sign out so the proxy stops bouncing /login -> /dashboard.
    const supabase = createClient(await cookies())
    await supabase.auth.signOut()
    redirect("/login?error=no_workspace")
  }

  const notifications = await getNotifications()

  return (
    <AppShell profile={profile} notifications={notifications}>
      {children}
    </AppShell>
  )
}
