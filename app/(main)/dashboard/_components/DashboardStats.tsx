import type { DashboardSide } from "@/lib/data/types"
import styles from "./DashboardStats.module.css"

interface DashboardStatsProps {
  stats: DashboardSide["stats"]
  direction: "given" | "received"
}

export default function DashboardStats({
  stats,
  direction,
}: DashboardStatsProps) {
  return (
    <div className={styles.grid}>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{stats.totalDots}</span>
        <span className={styles.label}>Dots {direction} in total</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{stats.activeMembers}</span>
        <span className={styles.label}>Active members</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{stats.avgPerMember}</span>
        <span className={styles.label}>Average per member</span>
      </div>
      <div className={`tt-glass ${styles.tile}`}>
        <span className={styles.value}>{stats.silentMembers}</span>
        <span className={styles.label}>
          {direction === "given"
            ? "Haven't given in 30+ days"
            : "Haven't received in 30+ days"}
        </span>
      </div>
    </div>
  )
}
