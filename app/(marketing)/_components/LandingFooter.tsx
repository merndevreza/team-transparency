import Link from "next/link"
import Logo from "@/components/Logo/Logo"
import styles from "./LandingFooter.module.css"

const PRODUCT_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#stories", label: "Stories" },
  { href: "#why", label: "Why openness" },
]

const ACCOUNT_LINKS = [
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Create a workspace" },
  { href: "/give-dot", label: "Give a dot" },
]

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size={40} />
            <div>
              <p className={styles.name}>Team Transparency</p>
              <p className={styles.tagline}>
                Visibility and openness are the defaults.
              </p>
              <a
                href="mailto:hello@teamtransparency.io"
                className={styles.link}
              >
                hello@teamtransparency.io
              </a>
            </div>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            <div className={styles.column}>
              <p className={styles.heading}>Product</p>
              {PRODUCT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.column}>
              <p className={styles.heading}>Account</p>
              {ACCOUNT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Team Transparency</span>
          <span className={styles.built}>
            Built with Next.js &amp; Supabase
          </span>
        </div>
      </div>
    </footer>
  )
}
