import type { NotificationItem } from "./types"

export const notifications: NotificationItem[] = [
  {
    id: "n-01",
    actorId: "u-02",
    kind: "dot_received",
    createdAt: "2026-10-18T14:30:00Z",
    preview:
      "Amara Khan sent you a dot: “Your release notes… were incredibly clear”",
    read: false,
  },
  {
    id: "n-02",
    actorId: "u-04",
    kind: "dot_received",
    createdAt: "2026-10-16T09:15:00Z",
    preview:
      "Priya Sharma sent you a dot: “You traced the flaky checkout bug…”",
    read: false,
  },
  {
    id: "n-03",
    actorId: "u-03",
    kind: "dot_received",
    createdAt: "2026-10-11T16:42:00Z",
    preview:
      "Diego Ruiz sent you a dot: “Thanks for flagging the API deadline risk…”",
    read: false,
  },
  {
    id: "n-04",
    actorId: "u-12",
    kind: "member_joined",
    createdAt: "2026-09-28T09:00:00Z",
    preview: "Grace Mensah joined the workspace",
    read: true,
  },
  {
    id: "n-05",
    actorId: "u-01",
    kind: "admin_change",
    createdAt: "2026-09-01T10:00:00Z",
    preview: "You granted admin rights to yourself",
    read: true,
  },
]

export const getNotifications = (): NotificationItem[] => notifications

export const getUnreadCount = (): number =>
  notifications.filter((item) => !item.read).length
