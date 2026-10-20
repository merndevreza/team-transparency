import styles from "./FeatureGrid.module.css"

const features = [
  {
    key: "open",
    tone: styles.toneA,
    title: "Recognition in the open",
    body: "Every dot is sent with attributes and sentiment, then lives where the whole team can see it. Praise becomes part of the record, not a private whisper.",
  },
  {
    key: "truth",
    tone: styles.toneB,
    title: "Summaries that tell the truth",
    body: "Given and received dots, last activity, top connectors, strongest attributes — tallied honestly, for you and for everyone else.",
  },
  {
    key: "dashboard",
    tone: styles.toneC,
    title: "Dashboards without blind spots",
    body: "Engagement patterns surface quietly: who is giving, who is receiving, and who the numbers say we might be overlooking.",
  },
  {
    key: "directory",
    tone: styles.toneD,
    title: "One directory of everyone",
    body: "Browse any colleague's public record and see their work the way their teammates actually experience it.",
  },
]

export default function FeatureGrid() {
  return (
    <section id="features" className={styles.section}>
      <p className={styles.eyebrow}>What transparency looks like</p>
      <h2 className={styles.title}>
        Everything happens where everyone can see it.
      </h2>
      <div className={styles.grid}>
        {features.map((feature) => (
          <article key={feature.key} className={styles.card}>
            <span className={`${styles.marker} ${feature.tone}`} aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardBody}>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
