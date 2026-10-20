"use client"

import { useTransition } from "react"
import { App, Button, Form, Input } from "antd"
import { requestPasswordReset } from "@/lib/actions/auth"

interface ForgotPasswordPanelValues {
  email: string
}

interface ForgotPasswordPanelProps {
  onBack: () => void
}

export default function ForgotPasswordPanel({
  onBack,
}: ForgotPasswordPanelProps) {
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<ForgotPasswordPanelValues>()

  const onFinish = (values: ForgotPasswordPanelValues) => {
    startTransition(async () => {
      const result = await requestPasswordReset(values.email)
      if (result.error) {
        message.error(result.error)
        return
      }
      message.success("If that email exists, a reset link is on its way")
      onBack()
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="Work email"
        rules={[
          { required: true, message: "Your email is required" },
          { type: "email", message: "That doesn't look like an email" },
        ]}
      >
        <Input autoComplete="email" placeholder="name@company.com" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block loading={pending}>
        Send reset link
      </Button>
      <Button type="link" block onClick={onBack}>
        Back to log in
      </Button>
    </Form>
  )
}
