"use client"

import { useState } from "react"
import { Segmented } from "antd"
import SectionCard from "@/components/summary/SectionCard"
import type { DashboardData, Profile } from "@/lib/data/types"
import DashboardStats from "./DashboardStats"
import InactiveMembers from "./InactiveMembers"
import MonthlyChart from "./MonthlyChart"
import RecentActivity from "./RecentActivity"
import SentimentLeaders from "./SentimentLeaders"
import styles from "./DashboardContent.module.css"

type Direction = "given" | "received"

interface DashboardContentProps {
  data: DashboardData
  users: Record<string, Profile>
}

export default function DashboardContent({
  data,
  users,
}: DashboardContentProps) {
  const [direction, setDirection] = useState<Direction>("given")
  const side = data[direction]

  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <Segmented
        value={direction}
        onChange={(value) => setDirection(value as Direction)}
        options={[
          { label: "Dots Given", value: "given" },
          { label: "Dots Received", value: "received" },
        ]}
      />
      <DashboardStats stats={side.stats} direction={direction} />
      <div className={styles.grid}>
        <SectionCard
          title={
            direction === "given"
              ? "Gone quiet the longest"
              : "Waiting the longest to be recognized"
          }
        >
          <InactiveMembers
            rows={side.longestSilent}
            direction={direction}
            users={users}
          />
        </SectionCard>
        <SectionCard title="Most recent activity">
          <RecentActivity
            rows={side.mostRecent}
            direction={direction}
            users={users}
          />
        </SectionCard>
      </div>
      <SectionCard title={`Dots per month — last 12 months`}>
        <MonthlyChart months={side.monthly} direction={direction} />
      </SectionCard>
      <SectionCard
        title={direction === "given" ? "Top givers" : "Top receivers"}
      >
        <SentimentLeaders
          leaders={side.leaders}
          direction={direction}
          users={users}
        />
      </SectionCard>
    </div>
  )
}
