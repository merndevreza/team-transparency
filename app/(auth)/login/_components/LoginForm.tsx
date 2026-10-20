"use client"

import { useTransition } from "react"
import { App, Button, Form, Input } from "antd"
import { signIn } from "@/lib/actions/auth"

interface LoginFormValues {
  email: string
  password: string
}

interface LoginFormProps {
  next: string
}

export default function LoginForm({ next }: LoginFormProps) {
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    startTransition(async () => {
      const result = await signIn({
        email: values.email,
        password: values.password,
        next,
      })
      if (result.error) {
        message.error(result.error)
      }
      // On success the action redirects — this line is never reached.
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
      <Button type="primary" htmlType="submit" block loading={pending}>
        Log in
      </Button>
    </Form>
  )
}
