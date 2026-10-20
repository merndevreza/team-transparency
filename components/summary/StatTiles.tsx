import RelativeTime from "@/components/RelativeTime/RelativeTime"
import type { UserSummary } from "@/lib/demo-data/types"
import styles from "./StatTiles.module.css"

interface StatTilesProps {
  summary: UserSummary
}

export default function StatTiles({ summary }: StatTilesProps) {
  return (
    <div className={styles.grid}>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{summary.received.total}</span>
        <span className={styles.label}>Dots received</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.valueDate}>
          {summary.received.lastAt ? (
            <RelativeTime iso={summary.received.lastAt} />
          ) : (
            "Never"
          )}
        </span>
        <span className={styles.label}>Last dot received</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{summary.given.total}</span>
        <span className={styles.label}>Dots given</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.valueDate}>
          {summary.given.lastAt ? (
            <RelativeTime iso={summary.given.lastAt} />
          ) : (
            "Never"
          )}
        </span>
        <span className={styles.label}>Last dot given</span>
      </div>
    </div>
  )
}
