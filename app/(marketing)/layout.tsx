import type { ReactNode } from "react"
import { Bricolage_Grotesque, Sora } from "next/font/google"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
})

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
})

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable}`}>{children}</div>
  )
}
