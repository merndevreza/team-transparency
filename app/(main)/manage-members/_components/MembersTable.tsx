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
import { removeMember, updateMember } from "@/lib/actions/members"
import type { Profile } from "@/lib/data/types"
import styles from "./MembersTable.module.css"

interface MembersTableProps {
  rows: Profile[]
  currentUserId: string
  status: "active" | "inactive"
}

export default function MembersTable({
  rows,
  currentUserId,
  status,
}: MembersTableProps) {
  const { message } = App.useApp()

  const runAction = async (
    action: () => Promise<{ error?: string }>,
    successText: string
  ) => {
    const result = await action()
    if (result.error) {
      message.error(result.error)
      return
    }
    message.success(successText)
  }

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
                  <span className={styles.name}>
                    {member.name}
                    {member.id === currentUserId && (
                      <span className={styles.youTag}> (you)</span>
                    )}
                  </span>
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
            render: (_, member) => {
              const isSelf = member.id === currentUserId
              return (
                <span className={styles.actions}>
                  <Tooltip
                    title={
                      isSelf
                        ? "You can't change your own role"
                        : member.role === "admin"
                          ? "Revoke admin"
                          : "Make admin"
                    }
                  >
                    <Button
                      type="text"
                      size="small"
                      disabled={isSelf}
                      icon={<UserSwitchOutlined />}
                      aria-label={`Toggle admin for ${member.name}`}
                      onClick={() =>
                        runAction(
                          () =>
                            updateMember(member.id, {
                              role:
                                member.role === "admin" ? "member" : "admin",
                            }),
                          member.role === "admin"
                            ? `${member.name} is no longer an admin`
                            : `${member.name} is now an admin`
                        )
                      }
                    />
                  </Tooltip>
                  <Tooltip
                    title={
                      isSelf
                        ? "You can't deactivate yourself"
                        : status === "active"
                          ? "Deactivate"
                          : "Activate"
                    }
                  >
                    <Button
                      type="text"
                      size="small"
                      disabled={isSelf}
                      icon={
                        status === "active" ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                      aria-label={`Toggle status for ${member.name}`}
                      onClick={() =>
                        runAction(
                          () =>
                            updateMember(member.id, {
                              status:
                                status === "active" ? "inactive" : "active",
                            }),
                          status === "active"
                            ? `${member.name} deactivated`
                            : `${member.name} activated`
                        )
                      }
                    />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Link
                      href={`/manage-members/edit-member/${member.id}`}
                      aria-label={`Edit ${member.name}`}
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                      />
                    </Link>
                  </Tooltip>
                  <Popconfirm
                    title={`Delete ${member.name}?`}
                    description="This cannot be undone."
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    disabled={isSelf}
                    onConfirm={() =>
                      runAction(
                        () => removeMember(member.id),
                        `${member.name} deleted`
                      )
                    }
                  >
                    <Tooltip
                      title={isSelf ? "You can't delete yourself" : "Delete"}
                    >
                      <Button
                        type="text"
                        size="small"
                        danger
                        disabled={isSelf}
                        icon={<DeleteOutlined />}
                        aria-label={`Delete ${member.name}`}
                      />
                    </Tooltip>
                  </Popconfirm>
                </span>
              )
            },
          },
        ]}
      />
    </div>
  )
}
