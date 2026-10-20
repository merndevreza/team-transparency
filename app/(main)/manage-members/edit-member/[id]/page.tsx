import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SectionCard from "@/components/summary/SectionCard"
import EditMemberForm from "./_components/EditMemberForm"
import { getCurrentProfile, getProfileById } from "@/lib/data/profiles"

export const metadata: Metadata = {
  title: "Edit member — Team Transparency",
}

export default async function EditMemberPage(
  props: PageProps<"/manage-members/edit-member/[id]">
) {
  const { id } = await props.params
  const [member, current] = await Promise.all([
    getProfileById(id),
    getCurrentProfile(),
  ])
  if (!member) notFound()

  return (
    <div className="tt-page tt-stack tt-narrow">
      <SectionCard title="Edit member">
        <EditMemberForm member={member} isSelf={current?.id === member.id} />
      </SectionCard>
    </div>
  )
}
