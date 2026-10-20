"use client"

import Link from "next/link"
import { App, Button, Popconfirm, Table, Tag, Tooltip } from "antd"
import {
  DeleteOutlined,
  EditOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons"
import RelativeTime from "@/components/RelativeTime/RelativeTime"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { useMembersStore } from "@/lib/store/membersStore"
import styles from "./MembersTable.module.css"

interface MembersTableProps {
  status: "active" | "inactive"
  query: string
}

export default function MembersTable({ status, query }: MembersTableProps) {
  const { message } = App.useApp()
  const members = useMembersStore((s) => s.members)
  const toggleRole = useMembersStore((s) => s.toggleRole)
  const toggleStatus = useMembersStore((s) => s.toggleStatus)
  const removeMember = useMembersStore((s) => s.removeMember)

  const rows = members.filter((member) => {
    if (member.status !== status) return false
    if (!query) return true
    return (
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.email.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <div className={`tt-glass ${styles.wrapper}`}>
      <Table
        rowKey="id"
        dataSource={rows}
        pagination={rows.length > 10 ? { pageSize: 10 } : false}
        columns={[
          {
            title: "Member",
            dataIndex: "name",
            render: (_, member) => (
              <span className={styles.member}>
                <UserAvatar user={member} size={36} />
                <span className={styles.who}>
                  <span className={styles.name}>{member.name}</span>
                  <span className={styles.email}>{member.email}</span>
                </span>
              </span>
            ),
          },
          {
            title: "Role",
            dataIndex: "role",
            width: 100,
            render: (_, member) => (
              <Tag color={member.role === "admin" ? "green" : "default"}>
                {member.role === "admin" ? "Admin" : "Member"}
              </Tag>
            ),
          },
          {
            title: "Last login",
            dataIndex: "lastLoginAt",
            width: 140,
            render: (_, member) =>
              member.lastLoginAt ? (
                <RelativeTime iso={member.lastLoginAt} />
              ) : (
                <span className={styles.never}>Never</span>
              ),
          },
          {
            title: "Actions",
            key: "actions",
            width: 170,
            align: "right",
            render: (_, member) => (
              <span className={styles.actions}>
                <Tooltip
                  title={
                    member.role === "admin" ? "Revoke admin" : "Make admin"
                  }
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<UserSwitchOutlined />}
                    onClick={() => {
                      toggleRole(member.id)
                      message.success(
                        member.role === "admin"
                          ? `${member.name} is no longer an admin (demo)`
                          : `${member.name} is now an admin (demo)`
                      )
                    }}
                  />
                </Tooltip>
                <Tooltip
                  title={status === "active" ? "Deactivate" : "Activate"}
                >
                  <Button
                    type="text"
                    size="small"
                    icon={
                      status === "active" ? (
                        <PauseCircleOutlined />
                      ) : (
                        <PlayCircleOutlined />
                      )
                    }
                    onClick={() => {
                      toggleStatus(member.id)
                      message.success(
                        status === "active"
                          ? `${member.name} deactivated (demo)`
                          : `${member.name} activated (demo)`
                      )
                    }}
                  />
                </Tooltip>
                <Tooltip title="Edit">
                  <Link
                    href={`/manage-members/edit-member/${member.id}`}
                    aria-label={`Edit ${member.name}`}
                  >
                    <Button type="text" size="small" icon={<EditOutlined />} />
                  </Link>
                </Tooltip>
                <Popconfirm
                  title={`Delete ${member.name}?`}
                  description="This cannot be undone."
                  okText="Delete"
                  okButtonProps={{ danger: true }}
                  onConfirm={() => {
                    removeMember(member.id)
                    message.success(`${member.name} deleted (demo)`)
                  }}
                >
                  <Tooltip title="Delete">
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      aria-label={`Delete ${member.name}`}
                    />
                  </Tooltip>
                </Popconfirm>
              </span>
            ),
          },
        ]}
      />
    </div>
  )
}
