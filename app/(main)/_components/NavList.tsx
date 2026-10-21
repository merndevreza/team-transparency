"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { UserRole } from "@/lib/data/types"
import {
  DashboardOutlined,
  SolutionOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import styles from "./NavList.module.css"

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    adminOnly: true,
  },
  { href: "/about-me", label: "About Me", icon: <UserOutlined /> },
  { href: "/about-others", label: "About Others", icon: <TeamOutlined /> },
  {
    href: "/manage-members",
    label: "Manage Members",
    icon: <SolutionOutlined />,
    adminOnly: true,
  },
  {
    href: "/manage-dots",
    label: "Manage Dots",
    icon: <TagsOutlined />,
    adminOnly: true,
  },
]

interface NavListProps {
  onNavigate?: () => void
  role: UserRole
}

export default function NavList({ onNavigate, role }: NavListProps) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav className={styles.nav} aria-label="Main">
      {NAV_ITEMS.filter((item) => role === "admin" || !item.adminOnly).map(
        (item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`${styles.item} ${isActive(item.href) ? styles.active : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )
      )}
    </nav>
  )
}
