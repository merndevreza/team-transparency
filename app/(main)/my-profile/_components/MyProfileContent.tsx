"use client"

import SectionCard from "@/components/summary/SectionCard"
import type { Profile } from "@/lib/data/types"
import ProfileCard from "./ProfileCard"
import EditNameForm from "./EditNameForm"
import ChangePasswordForm from "./ChangePasswordForm"
import styles from "./MyProfileContent.module.css"

interface MyProfileContentProps {
  profile: Profile
}

export default function MyProfileContent({ profile }: MyProfileContentProps) {
  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <ProfileCard user={profile} />
      <SectionCard title="Display name">
        <EditNameForm currentName={profile.name} />
      </SectionCard>
      <SectionCard title="Change password">
        <ChangePasswordForm />
      </SectionCard>
    </div>
  )
}
