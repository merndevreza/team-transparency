"use client"

import Link from "next/link"
import { Button } from "antd"
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons"
import Logo from "@/components/Logo/Logo"
import ThemeToggle from "@/components/Theme/ThemeToggle"
import type { UserRole } from "@/lib/data/types"
import { signOut } from "@/lib/actions/auth"
import NavList from "./NavList"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  onNavigate?: () => void
  role: UserRole
}

export default function Sidebar({ onNavigate, role }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <Logo size={34} />
      </div>
      <Link href="/give-dot" onClick={onNavigate} className={styles.giveButton}>
        <PlusOutlined />
        <span>Give Dot</span>
      </Link>
      <div className={styles.navArea}>
        <NavList onNavigate={onNavigate} role={role} />
      </div>
      <div className={styles.footer}>
        <ThemeToggle />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={() => {
            void signOut()
          }}
          className={styles.signOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}
