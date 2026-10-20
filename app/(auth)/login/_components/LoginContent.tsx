"use client"

import { useState } from "react"
import { Button } from "antd"
import Logo from "@/components/Logo/Logo"
import LoginForm from "./LoginForm"
import ForgotPasswordPanel from "./ForgotPasswordPanel"
import styles from "./LoginContent.module.css"

export default function LoginContent() {
  const [showForgot, setShowForgot] = useState(false)

  return (
    <div className={`tt-glass ${styles.card}`}>
      <div className={styles.brand}>
        <Logo size={44} />
      </div>
      <h1 className={styles.title}>
        {showForgot ? "Reset your password" : "Welcome back"}
      </h1>
      <p className={styles.subtitle}>
        {showForgot
          ? "Enter your work email and we'll send you a reset link."
          : "Sign in to see your team in plain sight."}
      </p>
      {showForgot ? (
        <ForgotPasswordPanel onBack={() => setShowForgot(false)} />
      ) : (
        <>
          <LoginForm />
          <Button type="link" block onClick={() => setShowForgot(true)}>
            Forgot password?
          </Button>
        </>
      )}
      <p className={styles.hint}>
        Demo mode — any valid email and password works.
      </p>
    </div>
  )
}
