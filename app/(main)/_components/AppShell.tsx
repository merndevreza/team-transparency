"use client"

import { useState, type ReactNode } from "react"
import { Drawer } from "antd"
import type { NotificationItem, Profile } from "@/lib/data/types"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import styles from "./AppShell.module.css"

interface AppShellProps {
  profile: Profile
  notifications: NotificationItem[]
  children: ReactNode
}

export default function AppShell({
  profile,
  notifications,
  children,
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebarColumn}>
        <Sidebar />
      </aside>
      <div className={styles.mainColumn}>
        <Topbar
          profile={profile}
          notifications={notifications}
          onMenu={() => setDrawerOpen(true)}
        />
        <main className={styles.content}>{children}</main>
      </div>
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="left"
        size={280}
        styles={{ body: { padding: 0 } }}
        closeIcon={null}
      >
        <Sidebar onNavigate={closeDrawer} />
      </Drawer>
    </div>
  )
}
