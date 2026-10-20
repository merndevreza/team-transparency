"use client"

import { App, Form, Input, Modal } from "antd"
import type { DotCategory, DotLabel } from "@/lib/demo-data/types"

export interface TaxonomyModalState {
  kind: "category" | "label"
  mode: "create" | "edit"
  category?: DotCategory
  label?: DotLabel
}

interface TaxonomyModalsProps {
  state: TaxonomyModalState | null
  onClose: () => void
  onSubmitCategory: (name: string) => void
  onSubmitLabel: (categoryId: string, name: string) => void
}

interface FormValues {
  name: string
}

export default function TaxonomyModals({
  state,
  onClose,
  onSubmitCategory,
  onSubmitLabel,
}: TaxonomyModalsProps) {
  const { message } = App.useApp()
  const [form] = Form.useForm<FormValues>()

  const isCategory = state?.kind === "category"
  const isEdit = state?.mode === "edit"
  const open = state !== null

  const handleOk = () => {
    form.validateFields().then((values: FormValues) => {
      if (!state) return
      if (isCategory) {
        onSubmitCategory(values.name)
        message.success(
          isEdit
            ? "Category renamed (demo)"
            : `Category “${values.name.trim()}” created (demo)`
        )
      } else if (state.category) {
        onSubmitLabel(state.category.id, values.name)
        message.success(
          isEdit
            ? "Label renamed (demo)"
            : `Label “${values.name.trim()}” created (demo)`
        )
      }
      form.resetFields()
      onClose()
    })
  }

  return (
    <Modal
      open={open}
      title={
        isCategory
          ? isEdit
            ? "Rename category"
            : "New category"
          : isEdit
            ? "Rename label"
            : `New label in “${state?.category?.name ?? ""}”`
      }
      okText={isEdit ? "Save" : "Create"}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      onOk={handleOk}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name:
            state?.mode === "edit"
              ? (state.label?.name ?? state.category?.name)
              : "",
        }}
      >
        <Form.Item
          name="name"
          label={isCategory ? "Category name" : "Label text"}
          rules={[
            { required: true, message: "This field is required" },
            { min: 3, message: "A little too short" },
          ]}
        >
          <Input
            placeholder={
              isCategory
                ? "e.g. Collaboration"
                : "e.g. Collaborated effectively"
            }
            autoFocus
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
