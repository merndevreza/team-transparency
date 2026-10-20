"use client"

import { useMemo } from "react"
import { Button, Input } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import type { DotLabel, Profile } from "@/lib/data/types"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import styles from "./ComposerBar.module.css"

interface ComposerBarProps {
  onSubmit: () => void
  submitLabel?: string
  pending?: boolean
  users: Record<string, Profile>
  labels: Record<string, DotLabel>
}

const CHIP_TONES = {
  thumbs_up: styles.thumbs,
  ok: styles.ok,
  loop: styles.loop,
} as const

export default function ComposerBar({
  onSubmit,
  submitLabel,
  pending = false,
  users,
  labels,
}: ComposerBarProps) {
  const recipientIds = useGiveDotStore((s) => s.recipientIds)
  const selections = useGiveDotStore((s) => s.selections)
  const comment = useGiveDotStore((s) => s.comment)
  const setComment = useGiveDotStore((s) => s.setComment)
  const setSelection = useGiveDotStore((s) => s.setSelection)

  const wordCount = useMemo(
    () => comment.trim().split(/\s+/).filter(Boolean).length,
    [comment]
  )

  const recipientsLabel =
    recipientIds.length === 0
      ? "No recipients"
      : recipientIds.length === 1
        ? (users[recipientIds[0]]?.name ?? "1 recipient")
        : `${recipientIds.length} recipients`

  const isValid =
    recipientIds.length > 0 &&
    Object.keys(selections).length > 0 &&
    wordCount > 0

  return (
    <div className={`tt-glass ${styles.bar}`}>
      <div className={styles.selections}>
        <span className={styles.recipients}>{recipientsLabel}</span>
        <div className={styles.chips}>
          {Object.entries(selections).map(([labelId, sentiment]) => (
            <span
              key={labelId}
              className={`${styles.chip} ${CHIP_TONES[sentiment]}`}
            >
              {labels[labelId]?.name ?? labelId}
              <button
                type="button"
                className={styles.remove}
                aria-label={`Remove ${labelId}`}
                onClick={() => setSelection(labelId, sentiment)}
              >
                <CloseOutlined />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className={styles.compose}>
        <Input.TextArea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share the story behind these dots — what happened, and why it mattered."
          autoSize={{ minRows: 2, maxRows: 4 }}
          maxLength={600}
        />
        <div className={styles.actions}>
          <span className={styles.count}>{wordCount} words</span>
          <Button
            type="primary"
            disabled={!isValid}
            loading={pending}
            onClick={onSubmit}
          >
            {submitLabel ??
              (Object.keys(selections).length > 1 ? "Give Dots" : "Give Dot")}
          </Button>
        </div>
      </div>
    </div>
  )
}
