"use client"

import { useRouter } from "next/navigation"
import { Button, Result } from "antd"
import styles from "./SuccessScreen.module.css"

interface SuccessScreenProps {
  mode: "give" | "edit"
  onGiveMore: () => void
}

export default function SuccessScreen({
  mode,
  onGiveMore,
}: SuccessScreenProps) {
  const router = useRouter()

  return (
    <div className={`tt-glass ${styles.card}`}>
      <Result
        status="success"
        title={mode === "give" ? "Dots delivered!" : "Dot updated!"}
        subTitle={
          mode === "give"
            ? "Your recognition is now visible to everyone in the workspace."
            : "Your changes are saved and visible to everyone."
        }
        extra={
          mode === "give" ? (
            <Button type="primary" onClick={onGiveMore}>
              Give more dots
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => router.push("/about-me/dots/given")}
            >
              Back to my dots
            </Button>
          )
        }
      />
    </div>
  )
}
