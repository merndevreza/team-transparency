"use client"

import { Badge, Button, Empty, Popover } from "antd"
import { BellOutlined } from "@ant-design/icons"
import RelativeTime from "@/components/RelativeTime/RelativeTime"
import { markAllRead } from "@/lib/actions/notifications"
import type { NotificationItem } from "@/lib/data/types"
import styles from "./NotificationsBell.module.css"

interface NotificationsBellProps {
  items: NotificationItem[]
}

export default function NotificationsBell({ items }: NotificationsBellProps) {
  const unread = items.filter((item) => !item.read).length

  const content = (
    <div className={styles.list}>
      {items.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No notifications"
        />
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.row} ${item.read ? "" : styles.unread}`}
        >
          <div className={styles.body}>
            <p className={styles.preview}>{item.preview}</p>
            <span className={styles.time}>
              <RelativeTime iso={item.createdAt} />
            </span>
          </div>
          {!item.read && <span className={styles.dot} aria-hidden />}
        </div>
      ))}
      {unread > 0 && (
        <Button
          type="link"
          size="small"
          onClick={() => {
            void markAllRead()
          }}
        >
          Mark all read
        </Button>
      )}
    </div>
  )

  return (
    <Popover
      content={content}
      title="Notifications"
      trigger="click"
      placement="bottomRight"
    >
      <Badge count={unread} size="small">
        <button
          type="button"
          className={styles.bell}
          aria-label="Notifications"
        >
          <BellOutlined />
        </button>
      </Badge>
    </Popover>
  )
}
