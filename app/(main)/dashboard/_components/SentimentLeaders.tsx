import { Progress, Tooltip } from "antd"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import SentimentDots from "@/components/dots/SentimentDots"
import type { DashboardSide, Profile } from "@/lib/data/types"
import styles from "./SentimentLeaders.module.css"

interface SentimentLeadersProps {
  leaders: DashboardSide["leaders"]
  direction: "given" | "received"
  users: Record<string, Profile>
}

export default function SentimentLeaders({
  leaders,
  direction,
  users,
}: SentimentLeadersProps) {
  return (
    <ul className={styles.list}>
      {leaders.map((leader) => {
        const user = users[leader.userId]
        if (!user) return null
        const thumbsShare = leader.total
          ? Math.round((leader.sentiments.thumbsUp / leader.total) * 100)
          : 0
        return (
          <li key={leader.userId} className={styles.row}>
            <UserAvatar user={user} size={34} />
            <div className={styles.who}>
              <p className={styles.name}>{user.name}</p>
              <span className={styles.total}>
                {leader.total} dots {direction}
              </span>
            </div>
            <SentimentDots counts={leader.sentiments} />
            <Tooltip title={`${thumbsShare}% thumbs-up`}>
              <Progress
                type="circle"
                size={38}
                percent={thumbsShare}
                strokeColor="var(--tt-primary)"
                format={(percent) => `${percent ?? 0}%`}
              />
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}
