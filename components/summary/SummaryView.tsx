import SectionCard from "./SectionCard"
import SummaryHeader from "./SummaryHeader"
import StatTiles from "./StatTiles"
import AttributeConnectorList from "./AttributeConnectorList"
import PersonConnectorList from "./PersonConnectorList"
import SummaryTabs, { type SummaryTab } from "./SummaryTabs"
import type { AppUser, UserSummary } from "@/lib/demo-data/types"
import styles from "./SummaryView.module.css"

interface SummaryViewProps {
  user: AppUser
  summary: UserSummary
  base: string
  active: SummaryTab
}

export default function SummaryView({
  user,
  summary,
  base,
  active,
}: SummaryViewProps) {
  return (
    <div className={`tt-page ${styles.page}`}>
      <SummaryHeader user={user} />
      <div className={styles.tabs}>
        <SummaryTabs base={base} active={active} />
      </div>
      <StatTiles summary={summary} />
      <div className={styles.grid}>
        <SectionCard title="Most dots received from">
          <PersonConnectorList connectors={summary.topReceivedFrom} />
        </SectionCard>
        <SectionCard title="Most dots given to">
          <PersonConnectorList connectors={summary.topGivenTo} />
        </SectionCard>
        <SectionCard title="Top attributes received">
          <AttributeConnectorList attributes={summary.topAttributesReceived} />
        </SectionCard>
        <SectionCard title="Top attributes given">
          <AttributeConnectorList attributes={summary.topAttributesGiven} />
        </SectionCard>
      </div>
    </div>
  )
}
