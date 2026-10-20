"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button, message } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import type { DotCategory, DotEntry, DotLabel, Profile } from "@/lib/data/types"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import { editDot, giveDots } from "@/lib/actions/dots"
import CategoryAccordion from "./CategoryAccordion"
import ComposerBar from "./ComposerBar"
import RecipientsPanel from "./RecipientsPanel"
import SuccessScreen from "./SuccessScreen"
import styles from "./DotComposer.module.css"

interface DotComposerProps {
  mode: "give" | "edit"
  entry?: DotEntry
  currentUserId: string
  recipients: Profile[]
  categories: DotCategory[]
  labels: Record<string, DotLabel>
  users: Record<string, Profile>
}

export default function DotComposer({
  mode,
  entry,
  currentUserId,
  recipients,
  categories,
  labels,
  users,
}: DotComposerProps) {
  const router = useRouter()
  const submit = useGiveDotStore((s) => s.submit)
  const isSubmitted = useGiveDotStore((s) => s.isSubmitted)
  const reset = useGiveDotStore((s) => s.reset)
  const loadEntry = useGiveDotStore((s) => s.loadEntry)
  const [pending, startTransition] = useTransition()

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
    startTransition(async () => {
      const selections = useGiveDotStore.getState().selections
      const comment = useGiveDotStore.getState().comment
      const result =
        mode === "give"
          ? await giveDots({
              recipientIds: useGiveDotStore.getState().recipientIds,
              selections,
              comment,
            })
          : entry
            ? await editDot({ dotId: entry.id, selections, comment })
            : { error: "Nothing to edit" }
      if (result.error) {
        message.error(result.error)
        return
      }
      message.success(mode === "give" ? "Dots delivered" : "Dot updated")
      submit()
    })
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
          <RecipientsPanel
            candidates={recipients}
            currentUserId={currentUserId}
            disabled={mode === "edit"}
          />
          <div className={`tt-glass ${styles.categories}`}>
            <CategoryAccordion categories={categories} />
          </div>
        </div>
      )}

      {!isSubmitted && (
        <ComposerBar
          onSubmit={handleSubmit}
          pending={pending}
          submitLabel={mode === "edit" ? "Save changes" : undefined}
          users={users}
          labels={labels}
        />
      )}
    </div>
  )
}
