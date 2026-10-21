import type { Metadata } from "next"
import LoginContent from "./_components/LoginContent"

export const metadata: Metadata = {
  title: "Log in — Team Transparency",
}

export default async function LoginPage(props: PageProps<"/login">) {
  const raw = await props.searchParams
  const next = Array.isArray(raw.next) ? raw.next[0] : raw.next
  const errorCode = Array.isArray(raw.error) ? raw.error[0] : raw.error

  return <LoginContent next={next ?? ""} errorCode={errorCode ?? ""} />
}
