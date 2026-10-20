"use client"

import type { ReactNode } from "react"
import { LikeOutlined, SmileOutlined, SyncOutlined } from "@ant-design/icons"
import type { Sentiment } from "@/lib/demo-data/types"
import styles from "./SentimentToggle.module.css"

const OPTIONS: { value: Sentiment; icon: ReactNode }[] = [
  { value: "thumbs_up", icon: <LikeOutlined /> },
  { value: "ok", icon: <SmileOutlined /> },
  { value: "loop", icon: <SyncOutlined /> },
]

interface SentimentToggleProps {
  labelId: string
  value: Sentiment | undefined
  onChange: (labelId: string, sentiment: Sentiment) => void
}

export default function SentimentToggle({
  labelId,
  value,
  onChange,
}: SentimentToggleProps) {
  return (
    <span className={styles.group} role="group" aria-label="Sentiment">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.value.replace("_", " ")}
          aria-pressed={value === option.value}
          className={`${styles.button} ${styles[option.value]} ${
            value === option.value ? styles.active : ""
          }`}
          onClick={() => onChange(labelId, option.value)}
        >
          {option.icon}
        </button>
      ))}
    </span>
  )
}
