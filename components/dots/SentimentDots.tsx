"use client"

import { LikeOutlined, SmileOutlined, SyncOutlined } from "@ant-design/icons"
import type { SentimentCounts } from "@/lib/data/types"
import styles from "./SentimentDots.module.css"

interface SentimentDotsProps {
  counts: SentimentCounts
}

export default function SentimentDots({ counts }: SentimentDotsProps) {
  return (
    <span className={styles.group} aria-label="Sentiment breakdown">
      <span
        className={`${styles.item} ${counts.thumbsUp === 0 ? styles.muted : styles.thumbs}`}
      >
        <LikeOutlined />
        <span>{counts.thumbsUp}</span>
      </span>
      <span
        className={`${styles.item} ${counts.ok === 0 ? styles.muted : styles.ok}`}
      >
        <SmileOutlined />
        <span>{counts.ok}</span>
      </span>
      <span
        className={`${styles.item} ${counts.loop === 0 ? styles.muted : styles.loop}`}
      >
        <SyncOutlined />
        <span>{counts.loop}</span>
      </span>
    </span>
  )
}
