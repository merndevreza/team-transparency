import type { Metadata } from "next"
import LandingNav from "./_components/LandingNav"
import Hero from "./_components/Hero"
import FeatureGrid from "./_components/FeatureGrid"
import Testimonials from "./_components/Testimonials"
import CtaSection from "./_components/CtaSection"
import LandingFooter from "./_components/LandingFooter"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Team Transparency — Your team, in plain sight",
  description:
    "A platform for transparent team management and collaboration. Recognition, feedback, and contribution — visible to everyone by default.",
}

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grain} aria-hidden />
      <div className={`${styles.blob} ${styles.blobGreen}`} aria-hidden />
      <div className={`${styles.blob} ${styles.blobOrange}`} aria-hidden />
      <div className={`${styles.blob} ${styles.blobBlue}`} aria-hidden />
      <LandingNav />
      <main>
        <Hero />
        <FeatureGrid />
        <Testimonials />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
