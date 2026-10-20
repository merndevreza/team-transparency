"use client"

import { App, Button, Form, Input } from "antd"
import { useRouter } from "next/navigation"

interface LoginFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    message.success(`Welcome back, ${values.email} (demo)`)
    router.push("/dashboard")
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
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Your password is required" }]}
      >
        <Input.Password
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Log in
      </Button>
    </Form>
  )
}
