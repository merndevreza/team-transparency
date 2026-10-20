"use client"

import { useState, useTransition } from "react"
import { App, Button, Form, Input, Typography } from "antd"
import { useRouter } from "next/navigation"
import { inviteMember } from "@/lib/actions/members"
import styles from "./AddMemberForm.module.css"

interface InviteMemberFormValues {
  email: string
}

export default function AddMemberForm() {
  const router = useRouter()
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [signupUrl, setSignupUrl] = useState<string | null>(null)
  const [form] = Form.useForm<InviteMemberFormValues>()

  const onFinish = (values: InviteMemberFormValues) => {
    startTransition(async () => {
      const result = await inviteMember({ email: values.email })
      if (result.error) {
        message.error(result.error)
        return
      }
      if (result.signupUrl) setSignupUrl(result.signupUrl)
      form.resetFields()
    })
  }

  if (signupUrl) {
    return (
      <div className={styles.invited}>
        <Typography.Paragraph>
          Send them this signup link — their email is already filled in:
        </Typography.Paragraph>
        <Typography.Paragraph code copyable className={styles.url}>
          {signupUrl}
        </Typography.Paragraph>
        <div className={styles.actions}>
          <Button onClick={() => setSignupUrl(null)}>Invite another</Button>
          <Button type="primary" onClick={() => router.push("/manage-members")}>
            Done
          </Button>
        </div>
      </div>
    )
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
          { required: true, message: "The email is required" },
          { type: "email", message: "That doesn't look like an email" },
        ]}
      >
        <Input autoComplete="email" placeholder="name@company.com" />
      </Form.Item>
      <p className={styles.note}>
        They&rsquo;ll join your workspace by signing up through this link with
        their own password. Email invitations are planned for later.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => router.push("/manage-members")}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={pending}>
          Create invite link
        </Button>
      </div>
    </Form>
  )
}
