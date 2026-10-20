"use client"

import { useRouter } from "next/navigation"
import { Dropdown } from "antd"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import { signOut } from "@/lib/actions/auth"
import type { Profile } from "@/lib/data/types"
import styles from "./UserMenu.module.css"

interface UserMenuProps {
  profile: Profile
}

export default function UserMenu({ profile }: UserMenuProps) {
  const router = useRouter()
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
            onClick: () => {
              void signOut()
            },
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
        <UserAvatar user={profile} size={30} />
      </button>
    </Dropdown>
  )
}
