"use client"

import { useTransition } from "react"
import { App, Button, Form, Input } from "antd"
import { updateName } from "@/lib/actions/profile"

interface EditNameFormValues {
  name: string
}

interface EditNameFormProps {
  currentName: string
}

export default function EditNameForm({ currentName }: EditNameFormProps) {
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<EditNameFormValues>()

  const onFinish = (values: EditNameFormValues) => {
    startTransition(async () => {
      const result = await updateName(values.name)
      if (result.error) {
        message.error(result.error)
        return
      }
      message.success("Name updated")
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ name: currentName }}
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        name="name"
        label="Display name"
        rules={[
          { required: true, message: "Your name is required" },
          { min: 2, message: "That's a little too short" },
        ]}
      >
        <Input autoComplete="name" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={pending}>
        Save name
      </Button>
    </Form>
  )
}
