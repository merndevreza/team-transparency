"use client"

import { useTransition } from "react"
import { App, Button, Form, Input } from "antd"
import PasswordChecklist from "@/components/account/PasswordChecklist"
import { signUpCompany } from "@/lib/actions/auth"
import styles from "./RegisterForm.module.css"

interface RegisterFormValues {
  companyName: string
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormProps {
  defaultEmail: string
  inviteToken: string
  invited: boolean
}

export default function RegisterForm({
  defaultEmail,
  inviteToken,
  invited,
}: RegisterFormProps) {
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<RegisterFormValues>()
  const password = Form.useWatch("password", form) ?? ""

  const onFinish = (values: RegisterFormValues) => {
    startTransition(async () => {
      const result = await signUpCompany({
        companyName: invited ? undefined : values.companyName,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        inviteToken: inviteToken || undefined,
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
      initialValues={{ email: defaultEmail }}
      onFinish={onFinish}
    >
      {!invited && (
        <Form.Item
          name="companyName"
          label="Company name"
          rules={[{ required: true, message: "Your company name is required" }]}
        >
          <Input autoComplete="organization" placeholder="e.g. Brightloop" />
        </Form.Item>
      )}
      <Form.Item
        name="fullName"
        label="Your full name"
        rules={[{ required: true, message: "Your name is required" }]}
      >
        <Input autoComplete="name" placeholder="e.g. Amara Khan" />
      </Form.Item>
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
        rules={[
          { required: true, message: "Choose a password" },
          { min: 8, message: "Passwords need at least 8 characters" },
        ]}
      >
        <Input.Password autoComplete="new-password" placeholder="••••••••" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Repeat the password" },
          ({ getFieldValue }) => ({
            validator: (_, value) =>
              !value || value === getFieldValue("password")
                ? Promise.resolve()
                : Promise.reject(new Error("The passwords don't match")),
          }),
        ]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      <PasswordChecklist password={password} />
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={pending}
        className={styles.submit}
      >
        Create workspace
      </Button>
    </Form>
  )
}
