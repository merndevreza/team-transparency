import Link from "next/link"
import { Tag } from "antd"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import type { Profile } from "@/lib/data/types"
import styles from "./PersonCard.module.css"

interface PersonCardProps {
  user: Profile
  received: number
  given: number
}

export default function PersonCard({ user, received, given }: PersonCardProps) {
  return (
    <Link
      href={`/about-others/${user.id}/summary`}
      className={`tt-glass tt-glass-hover ${styles.card} ${
        user.status === "inactive" ? styles.inactive : ""
      }`}
    >
      <div className={styles.top}>
        <UserAvatar user={user} size={48} />
        <div className={styles.who}>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        {user.status === "inactive" && <Tag>Inactive</Tag>}
      </div>
      <div className={styles.stats}>
        <span className={styles.stat}>
          <strong>{received}</strong> received
        </span>
        <span className={styles.divider} aria-hidden />
        <span className={styles.stat}>
          <strong>{given}</strong> given
        </span>
      </div>
    </Link>
  )
}
