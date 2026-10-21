import type { Metadata } from "next"
import SectionCard from "@/components/summary/SectionCard"
import CreateMemberForm from "./_components/CreateMemberForm"

export const metadata: Metadata = {
  title: "Create member — Team Transparency",
}

export default function CreateMemberPage() {
  return (
    <div className="tt-page tt-stack tt-narrow">
      <SectionCard title="Create a member account">
        <CreateMemberForm />
      </SectionCard>
    </div>
  )
}
