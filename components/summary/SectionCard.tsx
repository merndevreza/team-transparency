import type { ReactNode } from "react"
import styles from "./SectionCard.module.css"

interface SectionCardProps {
  title: string
  children: ReactNode
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className={`tt-glass ${styles.card}`}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </section>
  )
}
