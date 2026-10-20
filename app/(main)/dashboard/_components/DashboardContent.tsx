"use client"

import { useState } from "react"
import { Segmented } from "antd"
import SectionCard from "@/components/summary/SectionCard"
import { getDashboardData } from "@/lib/demo-data/dashboard"
import DashboardStats from "./DashboardStats"
import InactiveMembers from "./InactiveMembers"
import MonthlyChart from "./MonthlyChart"
import RecentActivity from "./RecentActivity"
import SentimentLeaders from "./SentimentLeaders"
import styles from "./DashboardContent.module.css"

type Direction = "given" | "received"

export default function DashboardContent() {
  const [direction, setDirection] = useState<Direction>("given")
  const data = getDashboardData()[direction]

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
      <DashboardStats stats={data.stats} direction={direction} />
      <div className={styles.grid}>
        <SectionCard
          title={
            direction === "given"
              ? "Gone quiet the longest"
              : "Waiting the longest to be recognized"
          }
        >
          <InactiveMembers rows={data.longestSilent} direction={direction} />
        </SectionCard>
        <SectionCard title="Most recent activity">
          <RecentActivity rows={data.mostRecent} direction={direction} />
        </SectionCard>
      </div>
      <SectionCard title={`Dots per month — last 12 months`}>
        <MonthlyChart months={data.monthly} direction={direction} />
      </SectionCard>
      <SectionCard
        title={direction === "given" ? "Top givers" : "Top receivers"}
      >
        <SentimentLeaders leaders={data.leaders} direction={direction} />
      </SectionCard>
    </div>
  )
}
