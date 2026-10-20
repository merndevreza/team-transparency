"use client"

import { useMemo, useState } from "react"
import { App, Button, Empty, Input } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import {
  createCategory,
  createLabel,
  deleteCategory,
  deleteLabel,
  renameCategory,
  renameLabel,
} from "@/lib/actions/taxonomy"
import type { DotCategory } from "@/lib/data/types"
import CategoryCard from "./CategoryCard"
import TaxonomyModals, { type TaxonomyModalState } from "./TaxonomyModals"
import styles from "./ManageDotsContent.module.css"

interface ManageDotsContentProps {
  categories: DotCategory[]
}

export default function ManageDotsContent({
  categories,
}: ManageDotsContentProps) {
  const { message } = App.useApp()
  const [query, setQuery] = useState("")
  const [modal, setModal] = useState<TaxonomyModalState | null>(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories
      .map((category) => ({
        ...category,
        labels: category.labels.filter((label) =>
          label.name.toLowerCase().includes(q)
        ),
      }))
      .filter(
        (category) =>
          category.name.toLowerCase().includes(q) || category.labels.length > 0
      )
  }, [categories, query])

  const run = async (
    action: () => Promise<{ error?: string }>,
    successText: string
  ) => {
    const result = await action()
    if (result.error) message.error(result.error)
    else message.success(successText)
  }

  const handleSubmitCategory = (name: string) => {
    if (!modal) return
    if (modal.mode === "edit" && modal.category) {
      void run(
        () => renameCategory(modal.category!.id, name),
        "Category renamed"
      )
    } else {
      void run(() => createCategory(name), `Category “${name.trim()}” created`)
    }
  }

  const handleSubmitLabel = (categoryId: string, name: string) => {
    if (!modal) return
    if (modal.mode === "edit" && modal.label) {
      void run(() => renameLabel(modal.label!.id, name), "Label renamed")
    } else {
      void run(
        () => createLabel(categoryId, name),
        `Label “${name.trim()}” created`
      )
    }
  }

  return (
    <div className={`tt-page tt-stack ${styles.page}`}>
      <div className={styles.controls}>
        <Input
          placeholder="Search categories or labels"
          prefix={<SearchOutlined />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          allowClear
          className={styles.search}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModal({ kind: "category", mode: "create" })}
        >
          New category
        </Button>
      </div>

      {visible.length === 0 && (
        <Empty description="No categories match that search" />
      )}

      <div className={styles.list}>
        {visible.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEditCategory={(target) =>
              setModal({ kind: "category", mode: "edit", category: target })
            }
            onDeleteCategory={(target) => {
              void run(
                () => deleteCategory(target.id),
                `Category “${target.name}” deleted`
              )
            }}
            onAddLabel={(categoryId) => {
              const target = categories.find((c) => c.id === categoryId)
              if (target)
                setModal({ kind: "label", mode: "create", category: target })
            }}
            onEditLabel={(label) => {
              const target = categories.find((c) => c.id === label.categoryId)
              if (target)
                setModal({
                  kind: "label",
                  mode: "edit",
                  category: target,
                  label,
                })
            }}
            onDeleteLabel={(label) => {
              void run(
                () => deleteLabel(label.id),
                `Label “${label.name}” deleted`
              )
            }}
          />
        ))}
      </div>

      <TaxonomyModals
        state={modal}
        onClose={() => setModal(null)}
        onSubmitCategory={handleSubmitCategory}
        onSubmitLabel={handleSubmitLabel}
      />
    </div>
  )
}
