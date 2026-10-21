import type { Metadata } from "next"
import { cookies } from "next/headers"
import RegisterContent from "./_components/RegisterContent"
import { createClient } from "@/utils/supabase/server"

export const metadata: Metadata = {
  title: "Register — Team Transparency",
}

export default async function RegisterPage(props: PageProps<"/register">) {
  const raw = await props.searchParams
  const email = Array.isArray(raw.email) ? raw.email[0] : raw.email
  const invite = Array.isArray(raw.invite) ? raw.invite[0] : raw.invite

  let invitePreview: { companyName: string; role: string } | null = null
  if (invite) {
    const supabase = createClient(await cookies())
    const { data } = await supabase.rpc("preview_invite", {
      p_token: invite,
    })
    if (data && data.length > 0) {
      invitePreview = { companyName: data[0].company_name, role: data[0].role }
    }
  }

  return (
    <RegisterContent
      defaultEmail={email ?? ""}
      inviteToken={invite ?? ""}
      invitePreview={invitePreview}
    />
  )
}
