"use client"

import Link from "next/link"
import Logo from "@/components/Logo/Logo"
import RegisterForm from "./RegisterForm"
import styles from "./RegisterContent.module.css"

interface RegisterContentProps {
  defaultEmail: string
}

export default function RegisterContent({
  defaultEmail,
}: RegisterContentProps) {
  return (
    <div className={`tt-glass ${styles.card}`}>
      <div className={styles.brand}>
        <Logo size={44} />
      </div>
      <h1 className={styles.title}>Create your workspace</h1>
      <p className={styles.subtitle}>
        Onboard your company in one step — you&rsquo;ll be its first admin.
      </p>
      <RegisterForm defaultEmail={defaultEmail} />
      <p className={styles.hint}>
        Already onboarded?{" "}
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </div>
  )
}
