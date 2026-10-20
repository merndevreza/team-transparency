"use client"

import { App, Button, Form, Input } from "antd"
import PasswordChecklist from "@/components/account/PasswordChecklist"
import styles from "./ChangePasswordForm.module.css"

interface ChangePasswordFormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordForm() {
  const { message } = App.useApp()
  const [form] = Form.useForm<ChangePasswordFormValues>()
  const newPassword = Form.useWatch("newPassword", form) ?? ""

  const onFinish = () => {
    message.success("Password updated (demo)")
    form.resetFields()
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        name="currentPassword"
        label="Current password"
        rules={[{ required: true, message: "Enter your current password" }]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>
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
      <div className={styles.actions}>
        <Button onClick={() => form.resetFields()}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Update password
        </Button>
      </div>
    </Form>
  )
}
