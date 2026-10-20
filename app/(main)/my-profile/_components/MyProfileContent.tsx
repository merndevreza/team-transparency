"use client"

import SectionCard from "@/components/summary/SectionCard"
import { getCurrentUser } from "@/lib/demo-data/current-user"
import ProfileCard from "./ProfileCard"
import EditNameForm from "./EditNameForm"
import ChangePasswordForm from "./ChangePasswordForm"
import styles from "./MyProfileContent.module.css"

export default function MyProfileContent() {
  const user = getCurrentUser()

  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <ProfileCard user={user} />
      <SectionCard title="Display name">
        <EditNameForm currentName={user.name} />
      </SectionCard>
      <SectionCard title="Change password">
        <ChangePasswordForm />
      </SectionCard>
    </div>
  )
}
