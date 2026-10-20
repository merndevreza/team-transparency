"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Layout, Menu } from "antd"

const { Content, Sider } = Layout

const navItems = [
  { key: "dashboard", label: <Link href="/dashboard">Dashboard</Link> },
  {
    key: "about-me",
    label: "About Me",
    children: [
      {
        key: "about-me-summary",
        label: <Link href="/about-me/summary">Summary</Link>,
      },
      {
        key: "about-me-dots-received",
        label: <Link href="/about-me/dots/received">Dots Received</Link>,
      },
      {
        key: "about-me-dots-given",
        label: <Link href="/about-me/dots/given">Dots Given</Link>,
      },
    ],
  },
  {
    key: "about-others",
    label: <Link href="/about-others">About Others</Link>,
  },
  { key: "my-profile", label: <Link href="/my-profile">My Profile</Link> },
  {
    key: "manage-members",
    label: <Link href="/manage-members">Manage Members</Link>,
  },
  { key: "manage-dots", label: <Link href="/manage-dots">Manage Dots</Link> },
]

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu mode="inline" items={navItems} />
      </Sider>
      <Content>{children}</Content>
    </Layout>
  )
}
