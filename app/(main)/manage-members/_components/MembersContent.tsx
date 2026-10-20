"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Segmented } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useMembersStore } from "@/lib/store/membersStore"
import MembersTable from "./MembersTable"
import styles from "./MembersContent.module.css"

type StatusView = "active" | "inactive"

export default function MembersContent() {
  const router = useRouter()
  const members = useMembersStore((s) => s.members)
  const [status, setStatus] = useState<StatusView>("active")
  const [query, setQuery] = useState("")

  const activeCount = members.filter(
    (member) => member.status === "active"
  ).length
  const inactiveCount = members.length - activeCount

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
          Add member
        </Button>
      </div>
      <MembersTable status={status} query={query.trim()} />
    </div>
  )
}
