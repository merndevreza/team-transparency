"use client"

import { Collapse } from "antd"
import { listCategories } from "@/lib/demo-data/dot-taxonomy"
import { useGiveDotStore } from "@/lib/store/giveDotStore"
import SentimentToggle from "./SentimentToggle"
import styles from "./CategoryAccordion.module.css"

export default function CategoryAccordion() {
  const selections = useGiveDotStore((s) => s.selections)
  const setSelection = useGiveDotStore((s) => s.setSelection)
  const categories = listCategories()

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
      expandIconPosition="end"
      ghost
    />
  )
}
