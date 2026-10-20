import type { Metadata } from "next"
import Link from "next/link"
import { getCurrentProfile } from "@/lib/data/profiles"
import ResetPasswordContent from "./_components/ResetPasswordContent"
import styles from "./reset-password.module.css"

export const metadata: Metadata = {
  title: "Reset password — Team Transparency",
}

export default async function ResetPasswordPage() {
  const profile = await getCurrentProfile()

  return (
    <div className={styles.frame}>
      {profile ? (
        <ResetPasswordContent />
      ) : (
        <div className={`tt-glass ${styles.card}`}>
          <h1 className={styles.title}>Open this from an email link</h1>
          <p className={styles.subtitle}>
            Password resets start from the “Forgot password?” flow on the login
            page — we&rsquo;ll email you a secure link that opens here with your
            session ready.
          </p>
          <Link href="/login" className={styles.link}>
            Back to log in
          </Link>
        </div>
      )}
    </div>
  )
}
