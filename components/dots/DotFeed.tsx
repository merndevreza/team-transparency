"use client"

import { useState } from "react"
import { Empty, Pagination } from "antd"
import { getUserById } from "@/lib/demo-data/users"
import type { DotEntry } from "@/lib/demo-data/types"
import DotCard from "./DotCard"
import styles from "./DotFeed.module.css"

const PAGE_SIZE = 10

interface DotFeedProps {
  entries: DotEntry[]
  direction: "received" | "given"
  showEdit?: boolean
  showQuality?: boolean
}

export default function DotFeed({
  entries,
  direction,
  showEdit = false,
  showQuality = false,
}: DotFeedProps) {
  const [page, setPage] = useState(1)

  if (entries.length === 0) {
    return <Empty description="No dots here yet" />
  }

  const start = (page - 1) * PAGE_SIZE
  const visible = entries.slice(start, start + PAGE_SIZE)

  return (
    <div className={styles.feed}>
      <div className={styles.cards}>
        {visible.map((entry) => {
          const counterpartId =
            direction === "received" ? entry.giverId : entry.receiverId
          const counterpart = getUserById(counterpartId)
          if (!counterpart) return null
          return (
            <DotCard
              key={entry.id}
              entry={entry}
              counterpart={counterpart}
              showEdit={showEdit}
              showQuality={showQuality}
            />
          )
        })}
      </div>
      {entries.length > PAGE_SIZE && (
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={entries.length}
          onChange={setPage}
          showSizeChanger={false}
          className={styles.pagination}
        />
      )}
    </div>
  )
}
