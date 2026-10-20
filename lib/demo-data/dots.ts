import type { DotEntry } from "./types"

export const dots: DotEntry[] = [
  {
    id: "d-001",
    giverId: "u-02",
    receiverId: "u-01",
    createdAt: "2026-10-18T14:30:00Z",
    comment:
      "Your release notes for the billing migration were incredibly clear — the whole team skipped the questions I expected.",
    details: [
      { labelId: "lbl-comm-clear", sentiment: "thumbs_up" },
      { labelId: "lbl-craft-clarity", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-002",
    giverId: "u-04",
    receiverId: "u-01",
    createdAt: "2026-10-16T09:15:00Z",
    comment:
      "You traced the flaky checkout bug to a race condition nobody else could pin down. Saved us days.",
    details: [
      { labelId: "lbl-solve-diagnose", sentiment: "thumbs_up" },
      { labelId: "lbl-craft-quality", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-003",
    giverId: "u-03",
    receiverId: "u-01",
    createdAt: "2026-10-11T16:42:00Z",
    comment:
      "Thanks for flagging the API deadline risk early — we re-planned before it became a fire.",
    details: [
      { labelId: "lbl-rel-risks", sentiment: "thumbs_up" },
      { labelId: "lbl-comm-informed", sentiment: "ok" },
    ],
    quality: "good",
  },
  {
    id: "d-004",
    giverId: "u-06",
    receiverId: "u-01",
    createdAt: "2026-09-29T11:20:00Z",
    comment:
      "The architecture session you ran made a scary refactor feel routine. Everyone left knowing exactly what to do.",
    details: [
      { labelId: "lbl-lead-clarity", sentiment: "thumbs_up" },
      { labelId: "lbl-collab-support", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-005",
    giverId: "u-08",
    receiverId: "u-01",
    createdAt: "2026-09-21T18:05:00Z",
    comment:
      "You coached me through my first production incident without ever taking the keyboard. I learned more that night than in a month.",
    details: [{ labelId: "lbl-growth-coach", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-006",
    giverId: "u-05",
    receiverId: "u-01",
    createdAt: "2026-09-09T10:00:00Z",
    comment:
      "Every date in the migration plan held. That kind of reliability is rare.",
    details: [
      { labelId: "lbl-own-promises", sentiment: "thumbs_up" },
      { labelId: "lbl-craft-detail", sentiment: "ok" },
    ],
    quality: "good",
  },
  {
    id: "d-007",
    giverId: "u-09",
    receiverId: "u-01",
    createdAt: "2026-08-27T13:35:00Z",
    comment:
      "Your demo made our onboarding flow click for the sales team instantly.",
    details: [
      { labelId: "lbl-comm-clear", sentiment: "thumbs_up" },
      { labelId: "lbl-solve-simple", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-008",
    giverId: "u-10",
    receiverId: "u-01",
    createdAt: "2026-08-14T15:50:00Z",
    comment:
      "You pushed back on the dark pattern in the signup flow because of what it meant for users. Thank you.",
    details: [{ labelId: "lbl-cust-user", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-009",
    giverId: "u-02",
    receiverId: "u-01",
    createdAt: "2026-07-30T09:25:00Z",
    comment: "Sprint 14 was chaos and you were the calm center of it.",
    details: [
      { labelId: "lbl-collab-effective", sentiment: "thumbs_up" },
      { labelId: "lbl-solve-calm", sentiment: "thumbs_up" },
      { labelId: "lbl-pos-energy", sentiment: "ok" },
    ],
    quality: "good",
  },
  {
    id: "d-010",
    giverId: "u-07",
    receiverId: "u-01",
    createdAt: "2026-07-11T12:10:00Z",
    comment:
      "The API error messages after your pass went from cryptic to genuinely helpful.",
    details: [{ labelId: "lbl-craft-clarity", sentiment: "ok" }],
    quality: "good",
  },
  {
    id: "d-011",
    giverId: "u-03",
    receiverId: "u-01",
    createdAt: "2026-06-18T20:45:00Z",
    comment:
      "When the database failed during launch week you were there until it was fixed.",
    details: [
      { labelId: "lbl-rel-counted", sentiment: "thumbs_up" },
      { labelId: "lbl-solve-calm", sentiment: "ok" },
    ],
    quality: "good",
  },
  {
    id: "d-012",
    giverId: "u-04",
    receiverId: "u-01",
    createdAt: "2026-05-27T08:30:00Z",
    comment:
      "The PR feedback was a bit abrupt in places — the points were right, the tone could be softer.",
    details: [{ labelId: "lbl-comm-feedback", sentiment: "loop" }],
    quality: "bad",
  },
  {
    id: "d-013",
    giverId: "u-01",
    receiverId: "u-02",
    createdAt: "2026-10-19T17:00:00Z",
    comment:
      "Amara's stakeholder update on Friday was the clearest status report I've read all year.",
    details: [
      { labelId: "lbl-comm-clear", sentiment: "thumbs_up" },
      { labelId: "lbl-collab-effective", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-014",
    giverId: "u-01",
    receiverId: "u-04",
    createdAt: "2026-10-15T14:20:00Z",
    comment:
      "Priya rebuilt the search ranking logic and cut p95 latency in half.",
    details: [
      { labelId: "lbl-solve-diagnose", sentiment: "thumbs_up" },
      { labelId: "lbl-craft-quality", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-015",
    giverId: "u-01",
    receiverId: "u-06",
    createdAt: "2026-10-08T10:40:00Z",
    comment:
      "Lena caught an edge case in the invoice rounding that would have cost us real money.",
    details: [{ labelId: "lbl-craft-detail", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-016",
    giverId: "u-01",
    receiverId: "u-08",
    createdAt: "2026-09-25T16:10:00Z",
    comment:
      "Hana went from zero to shipping on the payments team in three weeks.",
    details: [
      { labelId: "lbl-growth-fast", sentiment: "thumbs_up" },
      { labelId: "lbl-pos-morale", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-017",
    giverId: "u-01",
    receiverId: "u-03",
    createdAt: "2026-09-12T11:55:00Z",
    comment:
      "Diego steered the incident review to real fixes instead of blame.",
    details: [{ labelId: "lbl-lead-direction", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-018",
    giverId: "u-01",
    receiverId: "u-05",
    createdAt: "2026-08-20T09:05:00Z",
    comment:
      "Tomas went quiet for a week on the integrations track — we nearly lost the window.",
    details: [
      { labelId: "lbl-own-accountable", sentiment: "loop" },
      { labelId: "lbl-comm-informed", sentiment: "loop" },
    ],
    quality: "bad",
  },
  {
    id: "d-019",
    giverId: "u-01",
    receiverId: "u-10",
    createdAt: "2026-08-02T13:15:00Z",
    comment:
      "Elena turned a pile of NPS verbatims into a roadmap we actually shipped.",
    details: [{ labelId: "lbl-cust-action", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-020",
    giverId: "u-01",
    receiverId: "u-07",
    createdAt: "2026-07-15T15:35:00Z",
    comment: "Yusuf's migration runbook saved every team that came after us.",
    details: [{ labelId: "lbl-collab-knowledge", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-021",
    giverId: "u-03",
    receiverId: "u-02",
    createdAt: "2026-10-17T10:25:00Z",
    comment:
      "Amara made sure the design and platform teams finally shared one plan.",
    details: [
      { labelId: "lbl-lead-empower", sentiment: "thumbs_up" },
      { labelId: "lbl-collab-silos", sentiment: "thumbs_up" },
    ],
    quality: "good",
  },
  {
    id: "d-022",
    giverId: "u-04",
    receiverId: "u-02",
    createdAt: "2026-10-12T12:00:00Z",
    comment: "The quality bar on Amara's onboarding emails is remarkably high.",
    details: [{ labelId: "lbl-craft-quality", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-023",
    giverId: "u-02",
    receiverId: "u-03",
    createdAt: "2026-10-05T09:45:00Z",
    comment:
      "Diego kept the mobile and web clients perfectly in sync during the redesign.",
    details: [{ labelId: "lbl-comm-informed", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-024",
    giverId: "u-06",
    receiverId: "u-04",
    createdAt: "2026-09-30T14:10:00Z",
    comment:
      "Priya's caching sketch solved a problem we'd tabled twice before.",
    details: [{ labelId: "lbl-solve-creative", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-025",
    giverId: "u-08",
    receiverId: "u-05",
    createdAt: "2026-09-15T08:55:00Z",
    comment: "Tomas has shipped every integration on the day he promised.",
    details: [{ labelId: "lbl-rel-consistent", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-026",
    giverId: "u-05",
    receiverId: "u-08",
    createdAt: "2026-08-28T17:25:00Z",
    comment:
      "Hana picked up our legacy billing code faster than anyone so far.",
    details: [{ labelId: "lbl-growth-fast", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-027",
    giverId: "u-02",
    receiverId: "u-06",
    createdAt: "2026-08-10T11:30:00Z",
    comment:
      "Lena's runbook for the reporting jobs is the doc I point every new hire to.",
    details: [{ labelId: "lbl-comm-docs", sentiment: "thumbs_up" }],
    quality: "good",
  },
  {
    id: "d-028",
    giverId: "u-10",
    receiverId: "u-09",
    createdAt: "2026-07-22T16:40:00Z",
    comment:
      "Marcus quietly celebrated three teammates' wins in the demo this week.",
    details: [{ labelId: "lbl-pos-celebrate", sentiment: "thumbs_up" }],
    quality: "good",
  },
]

const byNewestFirst = (a: DotEntry, b: DotEntry) =>
  b.createdAt.localeCompare(a.createdAt)

export const getReceivedDots = (userId: string): DotEntry[] =>
  dots.filter((dot) => dot.receiverId === userId).sort(byNewestFirst)

export const getGivenDots = (userId: string): DotEntry[] =>
  dots.filter((dot) => dot.giverId === userId).sort(byNewestFirst)

export const getDotById = (id: string): DotEntry | undefined =>
  dots.find((dot) => dot.id === id)
