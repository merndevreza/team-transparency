import type { Metadata } from "next"
import SectionCard from "@/components/summary/SectionCard"
import EditMemberForm from "./_components/EditMemberForm"

export const metadata: Metadata = {
  title: "Edit member — Team Transparency",
}

export default async function EditMemberPage(
  props: PageProps<"/manage-members/edit-member/[id]">
) {
  const { id } = await props.params

  return (
    <div className="tt-page tt-stack tt-narrow">
      <SectionCard title="Edit member">
        <EditMemberForm memberId={id} />
      </SectionCard>
    </div>
  )
}
