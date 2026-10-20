"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, message } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import type { DotEntry } from "@/lib/demo-data/types"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import CategoryAccordion from "./CategoryAccordion"
import ComposerBar from "./ComposerBar"
import RecipientsPanel from "./RecipientsPanel"
import SuccessScreen from "./SuccessScreen"
import styles from "./DotComposer.module.css"

interface DotComposerProps {
  mode: "give" | "edit"
  entry?: DotEntry
}

export default function DotComposer({ mode, entry }: DotComposerProps) {
  const router = useRouter()
  const submit = useGiveDotStore((s) => s.submit)
  const isSubmitted = useGiveDotStore((s) => s.isSubmitted)
  const reset = useGiveDotStore((s) => s.reset)
  const loadEntry = useGiveDotStore((s) => s.loadEntry)

  useEffect(() => {
    if (mode === "edit" && entry) {
      loadEntry({
        recipientId: entry.receiverId,
        details: entry.details,
        comment: entry.comment,
      })
    }
    return () => reset()
  }, [mode, entry, loadEntry, reset])

  const handleSubmit = () => {
    submit()
    message.success(mode === "give" ? "Dots sent (demo)" : "Dot updated (demo)")
  }

  return (
    <div className={`tt-page ${styles.page}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {mode === "give" ? "Give Dots" : "Edit dot"}
          </h1>
          <p className={styles.subtitle}>
            {mode === "give"
              ? "Recognize teammates with attributes and honest sentiment — visible to everyone."
              : "Refine the attributes, sentiment, or words of a dot you already sent."}
          </p>
        </div>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => router.push("/dashboard")}
          aria-label="Close composer"
        />
      </header>

      {isSubmitted ? (
        <SuccessScreen
          mode={mode}
          onGiveMore={() => {
            reset()
            router.push("/give-dot")
          }}
        />
      ) : (
        <div className={styles.layout}>
          <RecipientsPanel disabled={mode === "edit"} />
          <div className={`tt-glass ${styles.categories}`}>
            <CategoryAccordion />
          </div>
        </div>
      )}

      {!isSubmitted && (
        <ComposerBar
          onSubmit={handleSubmit}
          submitLabel={mode === "edit" ? "Save changes" : undefined}
        />
      )}
    </div>
  )
}
