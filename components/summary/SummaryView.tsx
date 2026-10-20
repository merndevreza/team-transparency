import SectionCard from "./SectionCard"
import SummaryHeader from "./SummaryHeader"
import StatTiles from "./StatTiles"
import AttributeConnectorList from "./AttributeConnectorList"
import PersonConnectorList from "./PersonConnectorList"
import SummaryTabs, { type SummaryTab } from "./SummaryTabs"
import type { DotLabel, Profile, UserSummary } from "@/lib/data/types"
import styles from "./SummaryView.module.css"

interface SummaryViewProps {
  user: Profile
  summary: UserSummary
  base: string
  active: SummaryTab
  users: Record<string, Profile>
  labels: Record<string, DotLabel>
}

export default function SummaryView({
  user,
  summary,
  base,
  active,
  users,
  labels,
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
          <PersonConnectorList
            connectors={summary.topReceivedFrom}
            users={users}
          />
        </SectionCard>
        <SectionCard title="Most dots given to">
          <PersonConnectorList connectors={summary.topGivenTo} users={users} />
        </SectionCard>
        <SectionCard title="Top attributes received">
          <AttributeConnectorList
            attributes={summary.topAttributesReceived}
            labels={labels}
          />
        </SectionCard>
        <SectionCard title="Top attributes given">
          <AttributeConnectorList
            attributes={summary.topAttributesGiven}
            labels={labels}
          />
        </SectionCard>
      </div>
    </div>
  )
}
