import type { Metadata } from "next"
import DotComposer from "@/components/dots/DotComposer"

export const metadata: Metadata = {
  title: "Give Dots — Team Transparency",
}

export default function GiveDotPage() {
  return <DotComposer mode="give" />
}
