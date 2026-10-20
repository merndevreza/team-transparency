import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App as AntApp } from "antd"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Team Transparency",
  description: "A platform for transparent team management and collaboration.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AntdRegistry>
          <AntApp>{children}</AntApp>
        </AntdRegistry>
      </body>
    </html>
  )
}
