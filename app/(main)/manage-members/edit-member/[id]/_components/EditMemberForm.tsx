"use client"

import { useTransition } from "react"
import { App, Button, Form, Input, Radio } from "antd"
import { useRouter } from "next/navigation"
import { updateMember } from "@/lib/actions/members"
import type { Profile } from "@/lib/data/types"
import styles from "./EditMemberForm.module.css"

interface EditMemberFormValues {
  name: string
  role: Profile["role"]
}

interface EditMemberFormProps {
  member: Profile
  isSelf: boolean
}

export default function EditMemberForm({
  member,
  isSelf,
}: EditMemberFormProps) {
  const router = useRouter()
  const { message } = App.useApp()
  const [pending, startTransition] = useTransition()
  const [form] = Form.useForm<EditMemberFormValues>()

  const onFinish = (values: EditMemberFormValues) => {
    startTransition(async () => {
      const result = await updateMember(member.id, {
        name: values.name,
        role: values.role,
      })
      if (result.error) {
        message.error(result.error)
        return
      }
      message.success(`${values.name.trim()} updated`)
      router.push("/manage-members")
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={{ name: member.name, role: member.role }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Full name"
        rules={[{ required: true, message: "The name is required" }]}
      >
        <Input autoComplete="name" />
      </Form.Item>
      <Form.Item label="Email">
        <Input value={member.email} disabled />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        extra={isSelf ? "You can't change your own role." : undefined}
      >
        <Radio.Group
          disabled={isSelf}
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
        <Button type="primary" htmlType="submit" loading={pending}>
          Save changes
        </Button>
      </div>
    </Form>
  )
}
