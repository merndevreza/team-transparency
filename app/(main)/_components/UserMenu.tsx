"use client"

import { useRouter } from "next/navigation"
import { Dropdown, message } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { getCurrentUser } from "@/lib/demo-data/current-user"
import styles from "./UserMenu.module.css"

export default function UserMenu() {
  const router = useRouter()
  const user = getCurrentUser()

  const signOut = () => {
    message.success("Signed out (demo)")
    router.push("/login")
  }

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "profile",
            icon: <UserOutlined />,
            label: "My Profile",
            onClick: () => router.push("/my-profile"),
          },
          { type: "divider" },
          {
            key: "signout",
            icon: <LogoutOutlined />,
            label: "Sign out",
            onClick: signOut,
          },
        ],
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <button
        type="button"
        className={styles.trigger}
        aria-label="Account menu"
      >
        <UserAvatar user={user} size={30} />
      </button>
    </Dropdown>
  )
}
