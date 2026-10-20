"use client"

import { useMemo, useState } from "react"
import { Input } from "antd"
import { CheckOutlined, SearchOutlined } from "@ant-design/icons"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { CURRENT_USER_ID } from "@/lib/demo-data/current-user"
import { listUsers } from "@/lib/demo-data/users"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import styles from "./RecipientsPanel.module.css"

interface RecipientsPanelProps {
  disabled?: boolean
}

export default function RecipientsPanel({
  disabled = false,
}: RecipientsPanelProps) {
  const [query, setQuery] = useState("")
  const recipientIds = useGiveDotStore((s) => s.recipientIds)
  const toggleRecipient = useGiveDotStore((s) => s.toggleRecipient)

  const candidates = useMemo(
    () =>
      listUsers().filter(
        (user) =>
          user.id !== CURRENT_USER_ID &&
          user.status === "active" &&
          user.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  )

  return (
    <aside
      className={`tt-glass ${styles.panel} ${disabled ? styles.disabled : ""}`}
    >
      <h3 className={styles.title}>Recipients</h3>
      <Input
        placeholder="Search people"
        prefix={<SearchOutlined />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        allowClear
        disabled={disabled}
      />
      <div className={styles.list}>
        {candidates.length === 0 && (
          <p className={styles.empty}>No people found.</p>
        )}
        {candidates.map((user) => {
          const selected = recipientIds.includes(user.id)
          return (
            <button
              key={user.id}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              className={`${styles.row} ${selected ? styles.selected : ""}`}
              onClick={() => toggleRecipient(user.id)}
            >
              <UserAvatar user={user} size={34} />
              <span className={styles.name}>{user.name}</span>
              {selected && <CheckOutlined className={styles.check} />}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
