import { Avatar } from "antd"
import type { AppUser } from "@/lib/demo-data/types"

const AVATAR_TONES = [
  "linear-gradient(135deg, #4cae66, #2f7f45)",
  "linear-gradient(135deg, #4f9bd7, #3273a8)",
  "linear-gradient(135deg, #ff8f00, #c96f00)",
  "linear-gradient(135deg, #2fa58c, #1d7a67)",
  "linear-gradient(135deg, #7d9c4f, #5d7836)",
  "linear-gradient(135deg, #5a6fa8, #41527e)",
]

const hashId = (id: string): number =>
  [...id].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 997, 7)

const initialsOf = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("")

interface UserAvatarProps {
  user: AppUser
  size?: number
}

export default function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  return (
    <Avatar
      size={size}
      style={{
        background: AVATAR_TONES[hashId(user.id) % AVATAR_TONES.length],
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initialsOf(user.name)}
    </Avatar>
  )
}
