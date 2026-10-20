"use client"

import { Button, Collapse, Popconfirm } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import type { DotCategory, DotLabel } from "@/lib/demo-data/types"
import styles from "./CategoryCard.module.css"

interface CategoryCardProps {
  category: DotCategory
  onEditCategory: (category: DotCategory) => void
  onDeleteCategory: (category: DotCategory) => void
  onAddLabel: (categoryId: string) => void
  onEditLabel: (label: DotLabel) => void
  onDeleteLabel: (label: DotLabel) => void
}

export default function CategoryCard({
  category,
  onEditCategory,
  onDeleteCategory,
  onAddLabel,
  onEditLabel,
  onDeleteLabel,
}: CategoryCardProps) {
  return (
    <Collapse
      className={styles.collapse}
      ghost
      items={[
        {
          key: category.id,
          label: (
            <span className={styles.header}>
              <span className={styles.name}>{category.name}</span>
              <span className={styles.count}>
                {category.labels.length}{" "}
                {category.labels.length === 1 ? "label" : "labels"}
              </span>
            </span>
          ),
          extra: (
            <span className={styles.actions}>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                aria-label={`Edit category ${category.name}`}
                onClick={(event) => {
                  event.stopPropagation()
                  onEditCategory(category)
                }}
              />
              <Popconfirm
                title={`Delete “${category.name}” and all its labels?`}
                okText="Delete"
                okButtonProps={{ danger: true }}
                onConfirm={(event) => {
                  event?.stopPropagation()
                  onDeleteCategory(category)
                }}
                onCancel={(event) => event?.stopPropagation()}
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  aria-label={`Delete category ${category.name}`}
                  onClick={(event) => event.stopPropagation()}
                />
              </Popconfirm>
            </span>
          ),
          children: (
            <div className={styles.body}>
              <div className={styles.labelRows}>
                {category.labels.map((label) => (
                  <div key={label.id} className={styles.labelRow}>
                    <span>{label.name}</span>
                    <span className={styles.labelActions}>
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        aria-label={`Edit label ${label.name}`}
                        onClick={() => onEditLabel(label)}
                      />
                      <Popconfirm
                        title={`Delete “${label.name}”?`}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => onDeleteLabel(label)}
                      >
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          aria-label={`Delete label ${label.name}`}
                        />
                      </Popconfirm>
                    </span>
                  </div>
                ))}
                {category.labels.length === 0 && (
                  <p className={styles.empty}>No labels yet.</p>
                )}
              </div>
              <Button
                type="dashed"
                block
                onClick={() => onAddLabel(category.id)}
              >
                Add label
              </Button>
            </div>
          ),
        },
      ]}
    />
  )
}
