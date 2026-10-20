import Link from "next/link"
import { Tag } from "antd"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { getGivenDots, getReceivedDots } from "@/lib/demo-data/dots"
import type { AppUser } from "@/lib/demo-data/types"
import styles from "./PersonCard.module.css"

interface PersonCardProps {
  user: AppUser
}

export default function PersonCard({ user }: PersonCardProps) {
  const received = getReceivedDots(user.id).length
  const given = getGivenDots(user.id).length

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
