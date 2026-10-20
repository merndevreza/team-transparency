"use client"

import { useEffect } from "react"
import { Button, Result } from "antd"

export default function RouteError({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Result
      status="500"
      title="Something went wrong"
      subTitle={error instanceof Error ? error.message : undefined}
      extra={
        <Button type="primary" onClick={() => retry()}>
          Try again
        </Button>
      }
    />
  )
}
