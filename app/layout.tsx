import type { Metadata } from "next"
import { Caudex, Source_Sans_3 } from "next/font/google"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App as AntApp, ConfigProvider } from "antd"
import "./globals.css"

const display = Caudex({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
})

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Team Transparency",
  description: "A platform for transparent team management and collaboration.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{ token: { fontFamily: "var(--font-body), sans-serif" } }}
          >
            <AntApp>{children}</AntApp>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
