import RelativeTime from "@/components/RelativeTime/RelativeTime"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import type { DashboardSide, Profile } from "@/lib/data/types"
import styles from "./RecentActivity.module.css"

interface RecentActivityProps {
  rows: DashboardSide["mostRecent"]
  direction: "given" | "received"
  users: Record<string, Profile>
}

export default function RecentActivity({
  rows,
  direction,
  users,
}: RecentActivityProps) {
  return (
    <ul className={styles.list}>
      {rows.map((row) => {
        const user = users[row.userId]
        if (!user) return null
        return (
          <li key={row.userId} className={styles.row}>
            <UserAvatar user={user} size={34} />
            <div className={styles.text}>
              <p className={styles.line}>
                <strong>{user.name}</strong>{" "}
                {direction === "given" ? "gave dots" : "received dots"}
              </p>
              <RelativeTime iso={row.at} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
