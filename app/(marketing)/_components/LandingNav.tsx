import Link from "next/link"
import Logo from "@/components/Logo/Logo"
import styles from "./LandingNav.module.css"

export default function LandingNav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <div className={styles.brand}>
          <Logo size={30} />
          <span className={styles.wordmark}>Team Transparency</span>
        </div>
        <div className={styles.links}>
          <Link href="#features" className={styles.link}>
            Features
          </Link>
          <Link href="#why" className={styles.link}>
            Why openness
          </Link>
        </div>
        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>
            Log in
          </Link>
          <Link href="/login" className={styles.cta}>
            Get started
          </Link>
        </div>
      </nav>
    </header>
  )
}
