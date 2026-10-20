import type { ReactNode } from "react"
import { Flex } from "antd"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
      {children}
    </Flex>
  )
}
