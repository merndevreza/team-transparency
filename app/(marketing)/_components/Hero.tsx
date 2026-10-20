import Link from "next/link"
import styles from "./Hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <p className={`${styles.eyebrow} ${styles.r1}`}>Built for open teams</p>
        <h1 className={`${styles.title} ${styles.r2}`}>
          Your team, in <span className={styles.shine}>plain sight.</span>
        </h1>
        <p className={`${styles.lede} ${styles.r3}`}>
          Team Transparency makes recognition, feedback, and contribution
          visible to everyone — so trust is built in the open, not behind closed
          doors.
        </p>
        <div className={`${styles.actions} ${styles.r4}`}>
          <Link href="/login" className={styles.primary}>
            Log in
          </Link>
          <a href="#features" className={styles.secondary}>
            See how it works
          </a>
        </div>
        <p className={`${styles.meta} ${styles.r5}`}>
          No noise. No hidden leaderboards. Just honest signals.
        </p>
      </div>

      <div className={styles.visual} aria-hidden>
        <span className={`${styles.d} ${styles.d1}`} />
        <span className={`${styles.d} ${styles.d2}`} />
        <span className={`${styles.d} ${styles.d3}`} />
        <span className={`${styles.d} ${styles.d4}`} />

        <div className={`${styles.card} ${styles.receivedCard}`}>
          <div className={styles.cardHeader}>
            <span className={styles.avatar}>AK</span>
            <div>
              <p className={styles.cardTitle}>Amara sent you a dot</p>
              <p className={styles.cardTime}>2 min ago · visible to everyone</p>
            </div>
          </div>
          <p className={styles.quote}>
            “Your release notes were incredibly clear — they saved the whole
            team an hour of questions.”
          </p>
          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles.chipGreen}`}>
              Clarity
            </span>
            <span className={`${styles.chip} ${styles.chipOrange}`}>
              Ownership
            </span>
            <span className={`${styles.chip} ${styles.chipBlue}`}>
              Mentorship
            </span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.statCard}`}>
          <p className={styles.statValue}>+1,248</p>
          <p className={styles.statLabel}>dots given this quarter</p>
          <div className={styles.bars}>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={`${styles.card} ${styles.connectorCard}`}>
          <span className={styles.connectorDot} />
          <div>
            <p className={styles.connectorLabel}>Top connector</p>
            <p className={styles.connectorName}>Amara K.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
