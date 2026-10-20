import AttributeChip from "@/components/dots/AttributeChip"
import SentimentDots from "@/components/dots/SentimentDots"
import type {
  AttributeSummary,
  DotLabel,
  Sentiment,
  SentimentCounts,
} from "@/lib/data/types"
import styles from "./AttributeConnectorList.module.css"

const dominantSentiment = (counts: SentimentCounts): Sentiment => {
  if (counts.thumbsUp >= counts.ok && counts.thumbsUp >= counts.loop)
    return "thumbs_up"
  return counts.ok >= counts.loop ? "ok" : "loop"
}

interface AttributeConnectorListProps {
  attributes: AttributeSummary[]
  labels: Record<string, DotLabel>
}

export default function AttributeConnectorList({
  attributes,
  labels,
}: AttributeConnectorListProps) {
  if (attributes.length === 0) {
    return <p className={styles.empty}>No dots yet.</p>
  }

  return (
    <ul className={styles.list}>
      {attributes.map((attribute) => (
        <li key={attribute.labelId} className={styles.row}>
          <AttributeChip
            name={labels[attribute.labelId]?.name ?? "Unknown attribute"}
            sentiment={dominantSentiment(attribute.sentiments)}
          />
          <SentimentDots counts={attribute.sentiments} />
        </li>
      ))}
    </ul>
  )
}
