"use client"

import { App, Button, Form, Input, Radio, Result } from "antd"
import { useRouter } from "next/navigation"
import { useMembersStore } from "@/lib/store/membersStore"
import styles from "./EditMemberForm.module.css"

interface EditMemberFormValues {
  name: string
  email: string
  role: "member" | "admin"
}

interface EditMemberFormProps {
  memberId: string
}

export default function EditMemberForm({ memberId }: EditMemberFormProps) {
  const router = useRouter()
  const { message } = App.useApp()
  const member = useMembersStore((s) =>
    s.members.find((candidate) => candidate.id === memberId)
  )
  const updateMember = useMembersStore((s) => s.updateMember)
  const [form] = Form.useForm<EditMemberFormValues>()

  if (!member) {
    return (
      <Result
        status="warning"
        title="Member not found"
        subTitle="They may have been deleted."
        extra={
          <Button type="primary" onClick={() => router.push("/manage-members")}>
            Back to members
          </Button>
        }
      />
    )
  }

  const onFinish = (values: EditMemberFormValues) => {
    updateMember(memberId, values)
    message.success(`${values.name.trim()} updated (demo)`)
    router.push("/manage-members")
  }

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={{
        name: member.name,
        email: member.email,
        role: member.role,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Full name"
        rules={[{ required: true, message: "The name is required" }]}
      >
        <Input autoComplete="name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Work email"
        rules={[
          { required: true, message: "The email is required" },
          { type: "email", message: "That doesn't look like an email" },
        ]}
      >
        <Input autoComplete="email" />
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
      <div className={styles.actions}>
        <Button onClick={() => router.push("/manage-members")}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save changes
        </Button>
      </div>
    </Form>
  )
}
