import type { DotCategory, DotLabel } from "./types"

export const categories: DotCategory[] = [
  {
    id: "cat-collaboration",
    name: "Collaboration",
    labels: [
      {
        id: "lbl-collab-effective",
        categoryId: "cat-collaboration",
        name: "Collaborated effectively",
      },
      {
        id: "lbl-collab-support",
        categoryId: "cat-collaboration",
        name: "Supported the team",
      },
      {
        id: "lbl-collab-knowledge",
        categoryId: "cat-collaboration",
        name: "Shared knowledge generously",
      },
      {
        id: "lbl-collab-silos",
        categoryId: "cat-collaboration",
        name: "Broke down silos",
      },
      {
        id: "lbl-collab-review",
        categoryId: "cat-collaboration",
        name: "Was a great review partner",
      },
    ],
  },
  {
    id: "cat-communication",
    name: "Communication",
    labels: [
      {
        id: "lbl-comm-clear",
        categoryId: "cat-communication",
        name: "Communicated clearly",
      },
      {
        id: "lbl-comm-listened",
        categoryId: "cat-communication",
        name: "Listened actively",
      },
      {
        id: "lbl-comm-informed",
        categoryId: "cat-communication",
        name: "Kept everyone informed",
      },
      {
        id: "lbl-comm-feedback",
        categoryId: "cat-communication",
        name: "Gave constructive feedback",
      },
      {
        id: "lbl-comm-docs",
        categoryId: "cat-communication",
        name: "Wrote documentation people actually use",
      },
    ],
  },
  {
    id: "cat-ownership",
    name: "Ownership",
    labels: [
      {
        id: "lbl-own-took",
        categoryId: "cat-ownership",
        name: "Took ownership",
      },
      {
        id: "lbl-own-promises",
        categoryId: "cat-ownership",
        name: "Delivered on promises",
      },
      {
        id: "lbl-own-accountable",
        categoryId: "cat-ownership",
        name: "Held themselves accountable",
      },
      {
        id: "lbl-own-followthrough",
        categoryId: "cat-ownership",
        name: "Followed through on details",
      },
    ],
  },
  {
    id: "cat-problem-solving",
    name: "Problem solving",
    labels: [
      {
        id: "lbl-solve-diagnose",
        categoryId: "cat-problem-solving",
        name: "Diagnosed the real problem",
      },
      {
        id: "lbl-solve-creative",
        categoryId: "cat-problem-solving",
        name: "Found a creative solution",
      },
      {
        id: "lbl-solve-calm",
        categoryId: "cat-problem-solving",
        name: "Stayed calm under pressure",
      },
      {
        id: "lbl-solve-simple",
        categoryId: "cat-problem-solving",
        name: "Made complex things simple",
      },
    ],
  },
  {
    id: "cat-leadership",
    name: "Leadership",
    labels: [
      {
        id: "lbl-lead-clarity",
        categoryId: "cat-leadership",
        name: "Led with clarity",
      },
      {
        id: "lbl-lead-empower",
        categoryId: "cat-leadership",
        name: "Empowered others",
      },
      {
        id: "lbl-lead-voice",
        categoryId: "cat-leadership",
        name: "Made space for every voice",
      },
      {
        id: "lbl-lead-direction",
        categoryId: "cat-leadership",
        name: "Set the direction",
      },
    ],
  },
  {
    id: "cat-craft",
    name: "Craft",
    labels: [
      {
        id: "lbl-craft-quality",
        categoryId: "cat-craft",
        name: "Raised the quality bar",
      },
      {
        id: "lbl-craft-detail",
        categoryId: "cat-craft",
        name: "Sweated the details",
      },
      {
        id: "lbl-craft-clarity",
        categoryId: "cat-craft",
        name: "Created clarity",
      },
      {
        id: "lbl-craft-care",
        categoryId: "cat-craft",
        name: "Shipped with care",
      },
    ],
  },
  {
    id: "cat-reliability",
    name: "Reliability",
    labels: [
      {
        id: "lbl-rel-deadlines",
        categoryId: "cat-reliability",
        name: "Dependable under deadlines",
      },
      {
        id: "lbl-rel-consistent",
        categoryId: "cat-reliability",
        name: "Consistent every single week",
      },
      {
        id: "lbl-rel-risks",
        categoryId: "cat-reliability",
        name: "Flagged risks early",
      },
      {
        id: "lbl-rel-counted",
        categoryId: "cat-reliability",
        name: "Was there when it counted",
      },
    ],
  },
  {
    id: "cat-growth",
    name: "Growth",
    labels: [
      { id: "lbl-growth-fast", categoryId: "cat-growth", name: "Learned fast" },
      {
        id: "lbl-growth-feedback",
        categoryId: "cat-growth",
        name: "Acted on feedback",
      },
      {
        id: "lbl-growth-coach",
        categoryId: "cat-growth",
        name: "Coached a teammate",
      },
      {
        id: "lbl-growth-comfort",
        categoryId: "cat-growth",
        name: "Stepped out of the comfort zone",
      },
    ],
  },
  {
    id: "cat-positivity",
    name: "Positivity",
    labels: [
      {
        id: "lbl-pos-energy",
        categoryId: "cat-positivity",
        name: "Brought energy",
      },
      {
        id: "lbl-pos-morale",
        categoryId: "cat-positivity",
        name: "Lifted team morale",
      },
      {
        id: "lbl-pos-celebrate",
        categoryId: "cat-positivity",
        name: "Celebrated others",
      },
      {
        id: "lbl-pos-optimism",
        categoryId: "cat-positivity",
        name: "Stayed optimistic in a hard sprint",
      },
    ],
  },
  {
    id: "cat-customer",
    name: "Customer focus",
    labels: [
      {
        id: "lbl-cust-user",
        categoryId: "cat-customer",
        name: "Championed the user",
      },
      {
        id: "lbl-cust-action",
        categoryId: "cat-customer",
        name: "Turned feedback into action",
      },
      {
        id: "lbl-cust-detail",
        categoryId: "cat-customer",
        name: "Cared about details users feel",
      },
    ],
  },
]

export const labels: DotLabel[] = categories.flatMap(
  (category) => category.labels
)

export const listCategories = (): DotCategory[] => categories

export const getLabelById = (id: string): DotLabel | undefined =>
  labels.find((label) => label.id === id)
