import { Flex, Spin } from "antd"

export default function Loading() {
  return (
    <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
      <Spin />
    </Flex>
  )
}
