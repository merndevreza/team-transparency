import Link from "next/link"
import { Tag } from "antd"
import RelativeTime from "@/components/RelativeTime/RelativeTime"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import AttributeChip from "./AttributeChip"
import SentimentDots from "./SentimentDots"
import type { DotEntry, DotLabel, Profile } from "@/lib/data/types"
import styles from "./DotCard.module.css"

interface DotCardProps {
  entry: DotEntry
  counterpart: Profile
  showEdit?: boolean
  showQuality?: boolean
  labels: Record<string, DotLabel>
}

export default function DotCard({
  entry,
  counterpart,
  showEdit = false,
  showQuality = false,
  labels,
}: DotCardProps) {
  return (
    <article className={`tt-glass ${styles.card}`}>
      <header className={styles.header}>
        <UserAvatar user={counterpart} size={40} />
        <div className={styles.who}>
          <p className={styles.name}>{counterpart.name}</p>
          <span className={styles.meta}>
            <RelativeTime iso={entry.createdAt} />
          </span>
        </div>
        <div className={styles.side}>
          {showQuality && (
            <Tag color={entry.quality === "good" ? "green" : "orange"}>
              {entry.quality === "good" ? "Good" : "Needs review"}
            </Tag>
          )}
          {showEdit && (
            <Link href={`/edit-dot/${entry.id}`} className={styles.edit}>
              Edit
            </Link>
          )}
        </div>
      </header>
      <div className={styles.chips}>
        {entry.details.map((detail, index) => (
          <AttributeChip
            key={`${detail.labelId}-${index}`}
            name={labels[detail.labelId]?.name ?? "Unknown attribute"}
            sentiment={detail.sentiment}
          />
        ))}
      </div>
      <p className={styles.comment}>{entry.comment}</p>
      <footer className={styles.footer}>
        <SentimentDots
          counts={{
            thumbsUp: entry.details.filter((d) => d.sentiment === "thumbs_up")
              .length,
            ok: entry.details.filter((d) => d.sentiment === "ok").length,
            loop: entry.details.filter((d) => d.sentiment === "loop").length,
          }}
        />
      </footer>
    </article>
  )
}
