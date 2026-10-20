"use client"

import { useMemo, useState } from "react"
import { Empty, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { CURRENT_USER_ID } from "@/lib/demo-data/current-user"
import { listUsers } from "@/lib/demo-data/users"
import PersonCard from "./PersonCard"
import styles from "./DirectoryContent.module.css"

export default function DirectoryContent() {
  const [query, setQuery] = useState("")

  const people = useMemo(
    () =>
      listUsers()
        .filter((user) => user.id !== CURRENT_USER_ID)
        .filter((user) => {
          const q = query.trim().toLowerCase()
          if (!q) return true
          return (
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
          )
        }),
    [query]
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
          {people.map((user) => (
            <PersonCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
