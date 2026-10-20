"use client"

import { Tooltip } from "antd"
import type { MonthlyPoint } from "@/lib/demo-data/types"
import styles from "./MonthlyChart.module.css"

interface MonthlyChartProps {
  months: MonthlyPoint[]
  direction: "given" | "received"
}

const PLOT_HEIGHT = 150

const monthLabel = (month: string): string =>
  new Intl.DateTimeFormat("en", { month: "short" }).format(
    new Date(`${month}-01T00:00:00Z`)
  )

export default function MonthlyChart({ months, direction }: MonthlyChartProps) {
  const max = Math.max(...months.map((point) => point.given), 1)
  const currentMonth = months[months.length - 1]?.month

  return (
    <div
      className={styles.chart}
      role="img"
      aria-label={`Dots ${direction} per month`}
    >
      {months.map((point) => {
        const isCurrent = point.month === currentMonth
        const barHeight = Math.max(
          4,
          Math.round((point.given / max) * PLOT_HEIGHT)
        )
        return (
          <Tooltip
            key={point.month}
            title={`${monthLabel(point.month)} — ${point.given} dots`}
          >
            <div className={styles.column}>
              <span className={styles.value}>{point.given}</span>
              <div className={styles.plot}>
                <div
                  className={`${styles.bar} ${isCurrent ? styles.current : ""}`}
                  style={{ height: barHeight }}
                />
              </div>
              <span className={styles.label}>{monthLabel(point.month)}</span>
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}
