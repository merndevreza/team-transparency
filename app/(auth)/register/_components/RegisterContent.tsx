"use client"

import Link from "next/link"
import { Alert } from "antd"
import Logo from "@/components/Logo/Logo"
import RegisterForm from "./RegisterForm"
import styles from "./RegisterContent.module.css"

interface InvitePreview {
  companyName: string
  role: string
}

interface RegisterContentProps {
  defaultEmail: string
  inviteToken: string
  invitePreview: InvitePreview | null
}

export default function RegisterContent({
  defaultEmail,
  inviteToken,
  invitePreview,
}: RegisterContentProps) {
  return (
    <div className={`tt-glass ${styles.card}`}>
      <div className={styles.brand}>
        <Logo size={44} />
      </div>
      <h1 className={styles.title}>
        {invitePreview
          ? `Join ${invitePreview.companyName}`
          : "Create your workspace"}
      </h1>
      {invitePreview ? (
        <p className={styles.subtitle}>
          You&rsquo;ve been invited to join as{" "}
          <strong>
            {invitePreview.role === "admin" ? "an admin" : "a member"}
          </strong>
          . Set up your account below.
        </p>
      ) : (
        <p className={styles.subtitle}>
          Onboard your company in one step — you&rsquo;ll be its first admin.
        </p>
      )}
      {inviteToken && !invitePreview && (
        <Alert
          type="warning"
          showIcon
          title="That invite link has expired or was already used — you can still register a new company."
          className={styles.alert}
        />
      )}
      <RegisterForm
        defaultEmail={defaultEmail}
        inviteToken={inviteToken}
        invited={Boolean(invitePreview)}
      />
      <p className={styles.hint}>
        Already onboarded?{" "}
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </div>
  )
}
