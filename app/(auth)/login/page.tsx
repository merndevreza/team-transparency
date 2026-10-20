import type { Metadata } from "next"
import LoginContent from "./_components/LoginContent"

export const metadata: Metadata = {
  title: "Log in — Team Transparency",
}

export default function LoginPage() {
  return <LoginContent />
}
