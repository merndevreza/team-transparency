"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, message } from "antd"
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons"
import Logo from "@/components/Logo/Logo"
import ThemeToggle from "@/components/Theme/ThemeToggle"
import NavList from "./NavList"
import styles from "./Sidebar.module.css"

interface SidebarProps {
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const router = useRouter()

  const signOut = () => {
    message.success("Signed out (demo)")
    onNavigate?.()
    router.push("/login")
  }

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
        <NavList onNavigate={onNavigate} />
      </div>
      <div className={styles.footer}>
        <ThemeToggle />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={signOut}
          className={styles.signOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}
