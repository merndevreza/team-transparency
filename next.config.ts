import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  async redirects() {
    return [
      {
        source: "/about-me",
        destination: "/about-me/summary",
        permanent: true,
      },
      {
        source: "/about-others/:id",
        destination: "/about-others/:id/summary",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
