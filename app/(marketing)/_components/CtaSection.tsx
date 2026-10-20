import Link from "next/link"
import styles from "./CtaSection.module.css"

export default function CtaSection() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.panel}>
        <span className={`${styles.spark} ${styles.sparkA}`} aria-hidden />
        <span className={`${styles.spark} ${styles.sparkB}`} aria-hidden />
        <span className={`${styles.spark} ${styles.sparkC}`} aria-hidden />
        <h2 className={styles.title}>Work in plain sight.</h2>
        <p className={styles.body}>
          When recognition is public, trust stops being a policy and starts
          being a habit.
        </p>
        <Link href="/login" className={styles.button}>
          Log in
        </Link>
        <p className={styles.hint}>Your team is already here.</p>
      </div>
    </section>
  )
}
