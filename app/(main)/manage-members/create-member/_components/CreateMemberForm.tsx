"use client"

import { useTransition } from "react"
import { App, Button, Form, Input, Radio } from "antd"
import { useRouter } from "next/navigation"
import PasswordChecklist from "@/components/account/PasswordChecklist"
import { createMember } from "@/lib/actions/members"
import styles from "./CreateMemberForm.module.css"

interface CreateMemberFormValues {
  name: string
  email: string
  role: "member" | "admin"
  temporaryPassword: string
  confirmPassword: string
}

export default function CreateMemberForm() {
  const router = useRouter()
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<CreateMemberFormValues>()
  const temporaryPassword = Form.useWatch("temporaryPassword", form) ?? ""

  const onFinish = (values: CreateMemberFormValues) => {
    startTransition(async () => {
      const result = await createMember({
        name: values.name,
        email: values.email,
        role: values.role,
        temporaryPassword: values.temporaryPassword,
      })
      if (result.error) {
        message.error(result.error)
        return
      }
      message.success(
        `${values.name.trim()} created — share their credentials securely`
      )
      router.push("/manage-members")
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
        name="name"
        label="Full name"
        rules={[{ required: true, message: "The name is required" }]}
      >
        <Input autoComplete="name" placeholder="e.g. Amara Khan" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Work email"
        rules={[
          { required: true, message: "The email is required" },
          { type: "email", message: "That doesn't look like an email" },
        ]}
      >
        <Input autoComplete="email" placeholder="name@company.com" />
      </Form.Item>
      <Form.Item name="role" label="Role" initialValue="member">
        <Radio.Group
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Form.Item
        name="temporaryPassword"
        label="Temporary password"
        dependencies={["confirmPassword"]}
        rules={[
          { required: true, message: "Choose a temporary password" },
          { min: 8, message: "Passwords need at least 8 characters" },
        ]}
      >
        <Input.Password autoComplete="new-password" placeholder="••••••••" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Repeat temporary password"
        dependencies={["temporaryPassword"]}
        rules={[
          { required: true, message: "Repeat the temporary password" },
          ({ getFieldValue }) => ({
            validator: (_, value) =>
              !value || value === getFieldValue("temporaryPassword")
                ? Promise.resolve()
                : Promise.reject(new Error("The passwords don't match")),
          }),
        ]}
      >
        <Input.Password autoComplete="new-password" />
      </Form.Item>
      <PasswordChecklist password={temporaryPassword} />
      <p className={styles.note}>
        You'll share this password with the member yourself — they can change it
        from their profile after logging in.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => router.push("/manage-members")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={pending}>
          Create member
        </Button>
      </div>
    </Form>
  )
}
