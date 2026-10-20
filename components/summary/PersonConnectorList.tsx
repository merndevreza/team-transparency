import Link from "next/link"
import UserAvatar from "@/components/UserAvatar/UserAvatar"
import SentimentDots from "@/components/dots/SentimentDots"
import { getUserById } from "@/lib/demo-data/users"
import type { ConnectorSummary } from "@/lib/demo-data/types"
import styles from "./PersonConnectorList.module.css"

interface PersonConnectorListProps {
  connectors: ConnectorSummary[]
}

export default function PersonConnectorList({
  connectors,
}: PersonConnectorListProps) {
  if (connectors.length === 0) {
    return <p className={styles.empty}>No dots yet.</p>
  }

  return (
    <ul className={styles.list}>
      {connectors.map((connector) => {
        const user = getUserById(connector.userId)
        if (!user) return null
        return (
          <li key={connector.userId} className={styles.row}>
            <Link
              href={`/about-others/${user.id}/summary`}
              className={styles.person}
            >
              <UserAvatar user={user} size={36} />
              <span className={styles.name}>{user.name}</span>
            </Link>
            <SentimentDots counts={connector.sentiments} />
          </li>
        )
      })}
    </ul>
  )
}
