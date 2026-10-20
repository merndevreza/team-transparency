import type { Metadata } from "next"
import ResetPasswordContent from "./_components/ResetPasswordContent"
import styles from "./reset-password.module.css"

export const metadata: Metadata = {
  title: "Reset password — Team Transparency",
}

export default function ResetPasswordPage() {
  return (
    <div className={styles.frame}>
      <ResetPasswordContent />
    </div>
  )
}
