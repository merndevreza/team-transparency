"use client"

import { useMemo, useState } from "react"
import { App, Button, Empty, Input } from "antd"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useTaxonomyStore } from "@/lib/store/taxonomyStore"
import CategoryCard from "./CategoryCard"
import TaxonomyModals, { type TaxonomyModalState } from "./TaxonomyModals"
import styles from "./ManageDotsContent.module.css"

export default function ManageDotsContent() {
  const { message } = App.useApp()
  const categories = useTaxonomyStore((s) => s.categories)
  const addCategory = useTaxonomyStore((s) => s.addCategory)
  const renameCategory = useTaxonomyStore((s) => s.renameCategory)
  const removeCategory = useTaxonomyStore((s) => s.removeCategory)
  const addLabel = useTaxonomyStore((s) => s.addLabel)
  const renameLabel = useTaxonomyStore((s) => s.renameLabel)
  const removeLabel = useTaxonomyStore((s) => s.removeLabel)

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

  const handleSubmitCategory = (name: string) => {
    if (!modal) return
    if (modal.mode === "edit" && modal.category)
      renameCategory(modal.category.id, name)
    else addCategory(name)
  }

  const handleSubmitLabel = (categoryId: string, name: string) => {
    if (!modal) return
    if (modal.mode === "edit" && modal.label) renameLabel(modal.label.id, name)
    else addLabel(categoryId, name)
  }

  const handleDeleteCategory = (category: { name: string }) => {
    message.success(`Category “${category.name}” deleted (demo)`)
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
              removeCategory(target.id)
              handleDeleteCategory(target)
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
              removeLabel(label.id)
              message.success(`Label “${label.name}” deleted (demo)`)
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
