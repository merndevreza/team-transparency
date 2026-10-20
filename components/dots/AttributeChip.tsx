import { getLabelById } from "@/lib/demo-data/dot-taxonomy"
import type { Sentiment } from "@/lib/demo-data/types"
import styles from "./AttributeChip.module.css"

interface AttributeChipProps {
  labelId: string
  sentiment: Sentiment
}

export default function AttributeChip({
  labelId,
  sentiment,
}: AttributeChipProps) {
  const label = getLabelById(labelId)

  return (
    <span className={`${styles.chip} ${styles[sentiment]}`}>
      <span className={styles.dot} aria-hidden />
      {label?.name ?? "Unknown attribute"}
    </span>
  )
}
