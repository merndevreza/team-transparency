import Link from "next/link"
import styles from "./CtaSection.module.css"

export default function CtaSection() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.panel}>
        <span className={`${styles.spark} ${styles.sparkA}`} aria-hidden />
        <span className={`${styles.spark} ${styles.sparkB}`} aria-hidden />
        <span className={`${styles.spark} ${styles.sparkC}`} aria-hidden />
        <p className={styles.eyebrow}>Free for your whole team</p>
        <h2 className={styles.title}>Bring your company into the open.</h2>
        <p className={styles.body}>
          Set up your workspace in minutes, invite your team, and start giving
          dots — every feature, every seat, free while we grow.
        </p>
        <Link href="/register" className={styles.button}>
          Onboard your company
        </Link>
        <p className={styles.hint}>
          Free for every seat · No credit card required
        </p>
      </div>
    </section>
  )
}
