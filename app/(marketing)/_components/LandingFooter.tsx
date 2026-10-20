import Link from "next/link"
import Logo from "@/components/Logo/Logo"
import styles from "./LandingFooter.module.css"

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo size={34} />
          <div>
            <p className={styles.name}>Team Transparency</p>
            <p className={styles.tagline}>
              Visibility and openness are the defaults.
            </p>
          </div>
        </div>
        <div className={styles.meta}>
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
          <span>© 2026 Team Transparency</span>
        </div>
      </div>
    </footer>
  )
}
