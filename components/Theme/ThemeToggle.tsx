"use client"

import { MoonOutlined, SunOutlined } from "@ant-design/icons"
import { Segmented } from "antd"
import { useThemeStore } from "@/lib/store/themeStore"

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)

  return (
    <Segmented
      value={theme}
      onChange={(value) => setTheme(value as "light" | "dark")}
      options={[
        { value: "light", icon: <SunOutlined />, title: "Light theme" },
        { value: "dark", icon: <MoonOutlined />, title: "Dark theme" },
      ]}
    />
  )
}
