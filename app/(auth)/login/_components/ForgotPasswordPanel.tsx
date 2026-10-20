"use client"

import { App, Button, Form, Input } from "antd"

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
  const [form] = Form.useForm<ForgotPasswordPanelValues>()

  const onFinish = (values: ForgotPasswordPanelValues) => {
    message.success(`Reset link sent to ${values.email} (demo)`)
    onBack()
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
        <Input autoComplete="email" placeholder="name@teamtransparency.io" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Send reset link
      </Button>
      <Button type="link" block onClick={onBack}>
        Back to log in
      </Button>
    </Form>
  )
}
