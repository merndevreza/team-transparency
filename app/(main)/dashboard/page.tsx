import type { Metadata } from "next"
import DashboardContent from "./_components/DashboardContent"
import { getDashboardData } from "@/lib/data/dashboard"
import { listProfilesAsMap } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "Dashboard — Team Transparency",
}

export default async function DashboardPage() {
  const [data, users] = await Promise.all([
    getDashboardData(),
    listProfilesAsMap(),
  ])

  return <DashboardContent data={data} users={users} />
}
