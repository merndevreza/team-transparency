"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Segmented } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import type { Profile } from "@/lib/data/types"
import MembersTable from "./MembersTable"
import styles from "./MembersContent.module.css"

type StatusView = "active" | "inactive"

interface MembersContentProps {
  members: Profile[]
  currentUserId: string
}

export default function MembersContent({
  members,
  currentUserId,
}: MembersContentProps) {
  const router = useRouter()
  const [status, setStatus] = useState<StatusView>("active")
  const [query, setQuery] = useState("")

  const activeCount = members.filter(
    (member) => member.status === "active"
  ).length
  const inactiveCount = members.length - activeCount

  const rows = useMemo(
    () =>
      members.filter((member) => {
        if (member.status !== status) return false
        const q = query.trim().toLowerCase()
        if (!q) return true
        return (
          member.name.toLowerCase().includes(q) ||
          member.email.toLowerCase().includes(q)
        )
      }),
    [members, status, query]
  )

  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <div className={styles.controls}>
        <Segmented
          value={status}
          onChange={(value) => setStatus(value as StatusView)}
          options={[
            { label: `Active (${activeCount})`, value: "active" },
            { label: `Inactive (${inactiveCount})`, value: "inactive" },
          ]}
        />
        <Input
          placeholder="Search members"
          prefix={<SearchOutlined />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          allowClear
          className={styles.search}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push("/manage-members/add-member")}
        >
          Invite member
        </Button>
      </div>
      <MembersTable rows={rows} currentUserId={currentUserId} status={status} />
    </div>
  )
}
