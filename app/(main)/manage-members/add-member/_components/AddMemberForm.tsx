"use client"

import { App, Button, Form, Input, Radio } from "antd"
import { useRouter } from "next/navigation"
import { useMembersStore } from "@/lib/store/membersStore"
import styles from "./AddMemberForm.module.css"

interface AddMemberFormValues {
  name: string
  email: string
  role: "member" | "admin"
}

export default function AddMemberForm() {
  const router = useRouter()
  const { message } = App.useApp()
  const addMember = useMembersStore((s) => s.addMember)
  const [form] = Form.useForm<AddMemberFormValues>()

  const onFinish = (values: AddMemberFormValues) => {
    addMember(values)
    message.success(`${values.name.trim()} added to the workspace (demo)`)
    router.push("/manage-members")
  }

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={{ role: "member" }}
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
        <Input autoComplete="email" placeholder="name@teamtransparency.io" />
      </Form.Item>
      <Form.Item name="role" label="Role">
        <Radio.Group
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <p className={styles.note}>
        In the real product this sends an invitation email — for now the member
        is created directly with demo data.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => router.push("/manage-members")}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Add member
        </Button>
      </div>
    </Form>
  )
}
