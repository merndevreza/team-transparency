"use client"

import { useMemo, useState } from "react"
import { Empty, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import type { Profile } from "@/lib/data/types"
import PersonCard from "./PersonCard"
import styles from "./DirectoryContent.module.css"

interface DirectoryEntry {
  user: Profile
  received: number
  given: number
}

interface DirectoryContentProps {
  currentUserId: string
  entries: DirectoryEntry[]
}

export default function DirectoryContent({
  currentUserId,
  entries,
}: DirectoryContentProps) {
  const [query, setQuery] = useState("")

  const people = useMemo(
    () =>
      entries
        .filter((entry) => entry.user.id !== currentUserId)
        .filter((entry) => {
          const q = query.trim().toLowerCase()
          if (!q) return true
          return (
            entry.user.name.toLowerCase().includes(q) ||
            entry.user.email.toLowerCase().includes(q)
          )
        }),
    [entries, currentUserId, query]
  )

  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <div className={styles.controls}>
        <Input
          placeholder="Search by name or email"
          prefix={<SearchOutlined />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          allowClear
          className={styles.search}
        />
        <span className={styles.count}>
          {people.length} {people.length === 1 ? "person" : "people"}
        </span>
      </div>
      {people.length === 0 ? (
        <Empty description="Nobody matches that search" />
      ) : (
        <div className={styles.grid}>
          {people.map((entry) => (
            <PersonCard
              key={entry.user.id}
              user={entry.user}
              received={entry.received}
              given={entry.given}
            />
          ))}
        </div>
      )}
    </div>
  )
}
