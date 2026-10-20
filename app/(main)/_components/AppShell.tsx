"use client"

import { useState, type ReactNode } from "react"
import { Drawer } from "antd"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import styles from "./AppShell.module.css"

export default function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebarColumn}>
        <Sidebar />
      </aside>
      <div className={styles.mainColumn}>
        <Topbar onMenu={() => setDrawerOpen(true)} />
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
