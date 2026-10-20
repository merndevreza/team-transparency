import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { getUserById } from "@/lib/demo-data/users"
import type { DashboardSide } from "@/lib/demo-data/types"
import styles from "./InactiveMembers.module.css"

interface InactiveMembersProps {
  rows: DashboardSide["longestSilent"]
  direction: "given" | "received"
}

export default function InactiveMembers({
  rows,
  direction,
}: InactiveMembersProps) {
  return (
    <ul className={styles.list}>
      {rows.map((row) => {
        const user = getUserById(row.userId)
        if (!user) return null
        const concerning = row.daysSince > 30
        return (
          <li key={row.userId} className={styles.row}>
            <UserAvatar user={user} size={34} />
            <span className={styles.name}>{user.name}</span>
            <span
              className={`${styles.badge} ${concerning ? styles.alert : styles.calm}`}
            >
              {row.daysSince} {row.daysSince === 1 ? "day" : "days"} without{" "}
              {direction === "given" ? "giving" : "receiving"}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
