import { Tag } from "antd"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import type { Profile } from "@/lib/data/types"
import styles from "./ProfileCard.module.css"

interface ProfileCardProps {
  user: Profile
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const joined = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(user.joinedAt))

  return (
    <div className={`tt-glass ${styles.card}`}>
      <UserAvatar user={user} size={72} />
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
      </div>
      <div className={styles.badges}>
        <Tag color={user.role === "admin" ? "green" : "default"}>
          {user.role === "admin" ? "Admin" : "Member"}
        </Tag>
        <span className={styles.joined}>Member since {joined}</span>
      </div>
    </div>
  )
}
