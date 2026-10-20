import Link from "next/link"
import LogoSVG from "./LogoSVG"

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <Link href="/" aria-label="Team Transparency home">
      <LogoSVG size={size} />
    </Link>
  )
}
