import type { Sentiment } from "@/lib/data/types"
import styles from "./AttributeChip.module.css"

interface AttributeChipProps {
  name: string
  sentiment: Sentiment
}

export default function AttributeChip({ name, sentiment }: AttributeChipProps) {
  return (
    <span className={`${styles.chip} ${styles[sentiment]}`}>
      <span className={styles.dot} aria-hidden />
      {name}
    </span>
  )
}
