"use client"

import { usePathname } from "next/navigation"
import { Button } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import NotificationsBell from "./NotificationsBell"
import UserMenu from "./UserMenu"
import styles from "./Topbar.module.css"

const TITLES: [prefix: string, title: string][] = [
  ["/dashboard", "Dashboard"],
  ["/about-me", "About Me"],
  ["/about-others", "About Others"],
  ["/my-profile", "My Profile"],
  ["/manage-members", "Manage Members"],
  ["/manage-dots", "Manage Dots"],
]

const titleFor = (pathname: string): string =>
  TITLES.find(([prefix]) => pathname.startsWith(prefix))?.[1] ??
  "Team Transparency"

interface TopbarProps {
  onMenu: () => void
}

export default function Topbar({ onMenu }: TopbarProps) {
  const pathname = usePathname()

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenu}
          className={styles.menuButton}
          aria-label="Open navigation"
        />
        <h1 className={styles.title}>{titleFor(pathname)}</h1>
      </div>
      <div className={styles.right}>
        <NotificationsBell />
        <UserMenu />
      </div>
    </header>
  )
}
