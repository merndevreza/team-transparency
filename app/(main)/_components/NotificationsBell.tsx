"use client"

import { Badge, Empty, Popover } from "antd"
import { BellOutlined } from "@ant-design/icons"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import RelativeTime from "@/components/RelativeTime/RelativeTime"
import { getNotifications } from "@/lib/demo-data/notifications"
import { getUserById } from "@/lib/demo-data/users"
import styles from "./NotificationsBell.module.css"

export default function NotificationsBell() {
  const notifications = getNotifications()
  const unread = notifications.filter((item) => !item.read).length

  const content = (
    <div className={styles.list}>
      {notifications.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No notifications"
        />
      )}
      {notifications.map((item) => {
        const actor = getUserById(item.actorId)
        return (
          <div
            key={item.id}
            className={`${styles.row} ${item.read ? "" : styles.unread}`}
          >
            {actor && <UserAvatar user={actor} size={32} />}
            <div className={styles.body}>
              <p className={styles.preview}>{item.preview}</p>
              <span className={styles.time}>
                <RelativeTime iso={item.createdAt} />
              </span>
            </div>
            {!item.read && <span className={styles.dot} aria-hidden />}
          </div>
        )
      })}
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
