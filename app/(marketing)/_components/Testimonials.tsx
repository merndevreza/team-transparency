import styles from "./Testimonials.module.css"

const testimonials = [
  {
    key: "amara",
    initials: "AK",
    tone: styles.toneA,
    quote:
      "Our quietest engineer became our most visible one. Two months of public dots did what two years of all-hands couldn't.",
    name: "Amara K.",
    role: "Engineering Lead",
    stat: "412 dots received",
  },
  {
    key: "diego",
    initials: "DR",
    tone: styles.toneB,
    quote:
      "New hires get up to speed faster because they can see how people actually work together — not just an org chart.",
    name: "Diego R.",
    role: "Support Manager",
    stat: "198 dots given",
  },
  {
    key: "priya",
    initials: "PS",
    tone: styles.toneC,
    quote:
      "Transparency stopped being a slide in the handbook. People give credit in the open, and you can feel the trust shift.",
    name: "Priya S.",
    role: "Head of People",
    stat: "1,024 dots received",
  },
]

export default function Testimonials() {
  return (
    <section id="stories" className={styles.section}>
      <p className={styles.eyebrow}>Teams already working in the open</p>
      <h2 className={styles.title}>Trust grows when everyone can see it.</h2>
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <figure key={t.key} className={styles.card}>
            <span className={styles.mark} aria-hidden>
              “
            </span>
            <blockquote className={styles.quote}>{t.quote}</blockquote>
            <figcaption className={styles.footer}>
              <span className={`${styles.avatar} ${t.tone}`}>{t.initials}</span>
              <div className={styles.who}>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role}</p>
              </div>
              <span className={styles.stat}>{t.stat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
