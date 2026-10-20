import type { Metadata } from "next"
import LoginContent from "./_components/LoginContent"

export const metadata: Metadata = {
  title: "Log in — Team Transparency",
}

export default async function LoginPage(props: PageProps<"/login">) {
  const rawNext = await props.searchParams
  const next = Array.isArray(rawNext.next) ? rawNext.next[0] : rawNext.next

  return <LoginContent next={next ?? ""} />
}
