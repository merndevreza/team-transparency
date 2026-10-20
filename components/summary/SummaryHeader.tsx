import { Tag } from "antd"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import type { AppUser } from "@/lib/demo-data/types"
import styles from "./SummaryHeader.module.css"

interface SummaryHeaderProps {
  user: AppUser
}

export default function SummaryHeader({ user }: SummaryHeaderProps) {
  return (
    <div className={styles.header}>
      <UserAvatar user={user} size={56} />
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
      </div>
      <Tag
        color={user.role === "admin" ? "green" : "default"}
        className={styles.role}
      >
        {user.role === "admin" ? "Admin" : "Member"}
      </Tag>
    </div>
  )
}
