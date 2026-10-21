"use client"

import { Collapse } from "antd"
import type { DotCategory } from "@/lib/data/types"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import SentimentToggle from "./SentimentToggle"
import styles from "./CategoryAccordion.module.css"

interface CategoryAccordionProps {
  categories: DotCategory[]
}

export default function CategoryAccordion({
  categories,
}: CategoryAccordionProps) {
  const selections = useGiveDotStore((s) => s.selections)
  const setSelection = useGiveDotStore((s) => s.setSelection)

  const items = categories.map((category) => {
    const selectedCount = category.labels.filter(
      (label) => selections[label.id]
    ).length

    return {
      key: category.id,
      label: (
        <span className={styles.categoryLabel}>
          {category.name}
          {selectedCount > 0 && (
            <span className={styles.badge}>{selectedCount}</span>
          )}
        </span>
      ),
      children: (
        <div className={styles.labels}>
          {category.labels.map((label) => (
            <div key={label.id} className={styles.labelRow}>
              <span className={styles.labelName}>{label.name}</span>
              <SentimentToggle
                labelId={label.id}
                value={selections[label.id]}
                onChange={setSelection}
              />
            </div>
          ))}
        </div>
      ),
    }
  })

  return (
    <Collapse
      className={styles.collapse}
      items={items}
      defaultActiveKey={categories[0] ? [categories[0].id] : []}
      expandIconPlacement="end"
      ghost
    />
  )
}
