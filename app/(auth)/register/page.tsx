import type { Metadata } from "next"
import RegisterContent from "./_components/RegisterContent"

export const metadata: Metadata = {
  title: "Register — Team Transparency",
}

export default async function RegisterPage(props: PageProps<"/register">) {
  const rawParams = await props.searchParams
  const email = Array.isArray(rawParams.email) ? rawParams.email[0] : rawParams.email

  return <RegisterContent defaultEmail={email ?? ""} />
}
