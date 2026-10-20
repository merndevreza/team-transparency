"use client"

import { useTransition } from "react"
import { App, Button, Form, Input } from "antd"
import PasswordChecklist from "@/components/account/PasswordChecklist"
import { resetPassword } from "@/lib/actions/auth"
import styles from "./ResetPasswordContent.module.css"

interface ResetPasswordFormValues {
  newPassword: string
  confirmPassword: string
}

export default function ResetPasswordContent() {
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<ResetPasswordFormValues>()
  const newPassword = Form.useWatch("newPassword", form) ?? ""

  const onFinish = (values: ResetPasswordFormValues) => {
    startTransition(async () => {
      const result = await resetPassword(values.newPassword)
      if (result.error) {
        message.error(result.error)
      }
      // On success the action redirects — this line is never reached.
    })
  }

  return (
    <div className={`tt-glass ${styles.card}`}>
      <h1 className={styles.title}>Set a new password</h1>
      <p className={styles.subtitle}>
        Choose something strong — your team will never see it, but you&rsquo;ll need
        it every day.
      </p>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[{ required: true, message: "Enter a new password" }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Repeat new password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Repeat the new password" },
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                !value || value === getFieldValue("newPassword")
                  ? Promise.resolve()
                  : Promise.reject(new Error("The passwords don't match")),
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <PasswordChecklist password={newPassword} />
        <Button type="primary" htmlType="submit" block loading={pending}>
          Reset password
        </Button>
      </Form>
    </div>
  )
}
