"use client"

import { App, Button, Form, Input } from "antd"

interface EditNameFormValues {
  name: string
}

interface EditNameFormProps {
  currentName: string
}

export default function EditNameForm({ currentName }: EditNameFormProps) {
  const { message } = App.useApp()
  const [form] = Form.useForm<EditNameFormValues>()

  const onFinish = (values: EditNameFormValues) => {
    message.success(`Name updated to “${values.name.trim()}” (demo)`)
    form.resetFields()
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
      <Button type="primary" htmlType="submit">
        Save name
      </Button>
    </Form>
  )
}
