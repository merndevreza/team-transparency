import type { Metadata } from "next"
import { Caudex, Source_Sans_3 } from "next/font/google"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import ThemeProvider from "@/components/Theme/ThemeProvider"
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

const themeInitScript = `(function(){try{var t=localStorage.getItem("tt-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable}`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <AntdRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
