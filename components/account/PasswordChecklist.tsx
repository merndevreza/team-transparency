"use client"

import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import styles from "./PasswordChecklist.module.css"

interface PasswordChecklistProps {
  password: string
}

const RULES: { label: string; test: (value: string) => boolean }[] = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "An uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "A lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "A digit", test: (v) => /\d/.test(v) },
  {
    label: "A special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
]

export default function PasswordChecklist({
  password,
}: PasswordChecklistProps) {
  return (
    <ul className={styles.list}>
      {RULES.map((rule) => {
        const passed = rule.test(password)
        return (
          <li
            key={rule.label}
            className={`${styles.item} ${passed ? styles.passed : styles.failed}`}
          >
            {passed ? <CheckOutlined /> : <CloseOutlined />}
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
