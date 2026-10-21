"use client"

import Link from "next/link"
import { useState } from "react"
import { Alert, Button } from "antd"
import Logo from "@/components/Logo/Logo"
import LoginForm from "./LoginForm"
import ForgotPasswordPanel from "./ForgotPasswordPanel"
import styles from "./LoginContent.module.css"

const ERROR_MESSAGES: Record<string, string> = {
  no_workspace:
    "This account has no workspace yet — it was created before workspaces were set up. Register a new company below.",
  link_expired:
    "That link has expired or was already used. Request a new one below.",
}

interface LoginContentProps {
  next: string
  errorCode: string
}

export default function LoginContent({ next, errorCode }: LoginContentProps) {
  const [showForgot, setShowForgot] = useState(false)

  return (
    <div className={`tt-glass ${styles.card}`}>
      <div className={styles.brand}>
        <Logo size={44} />
      </div>
      <h1 className={styles.title}>
        {showForgot ? "Reset your password" : "Welcome back"}
      </h1>
      {errorCode && ERROR_MESSAGES[errorCode] && (
        <Alert
          type="warning"
          showIcon
          message={ERROR_MESSAGES[errorCode]}
          className={styles.alert}
        />
      )}
      <p className={styles.subtitle}>
        {showForgot
          ? "Enter your work email and we'll send you a reset link."
          : "Sign in to see your team in plain sight."}
      </p>
      {showForgot ? (
        <ForgotPasswordPanel onBack={() => setShowForgot(false)} />
      ) : (
        <>
          <LoginForm next={next} />
          <Button type="link" block onClick={() => setShowForgot(true)}>
            Forgot password?
          </Button>
        </>
      )}
      <p className={styles.hint}>
        New here?{" "}
        <Link href="/register" className={styles.link}>
          Onboard your company
        </Link>
      </p>
    </div>
  )
}
