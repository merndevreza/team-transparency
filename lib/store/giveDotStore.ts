import { create } from "zustand"
import type { DotEntryDetail, Sentiment } from "@/lib/demo-data/types"

interface GiveDotState {
  recipientIds: string[]
  selections: Record<string, Sentiment>
  comment: string
  isSubmitted: boolean
  toggleRecipient: (userId: string) => void
  setSelection: (labelId: string, sentiment: Sentiment) => void
  setComment: (comment: string) => void
  submit: () => void
  loadEntry: (payload: {
    recipientId: string
    details: DotEntryDetail[]
    comment: string
  }) => void
  reset: () => void
}

const initial = {
  recipientIds: [] as string[],
  selections: {} as Record<string, Sentiment>,
  comment: "",
  isSubmitted: false,
}

export const useGiveDotStore = create<GiveDotState>()((set) => ({
  ...initial,
  toggleRecipient: (userId) =>
    set((s) => ({
      recipientIds: s.recipientIds.includes(userId)
        ? s.recipientIds.filter((id) => id !== userId)
        : [...s.recipientIds, userId],
    })),
  setSelection: (labelId, sentiment) =>
    set((s) => {
      const selections = { ...s.selections }
      if (selections[labelId] === sentiment) delete selections[labelId]
      else selections[labelId] = sentiment
      return { selections }
    }),
  setComment: (comment) => set({ comment }),
  submit: () => set({ isSubmitted: true }),
  loadEntry: ({ recipientId, details, comment }) =>
    set({
      recipientIds: [recipientId],
      selections: Object.fromEntries(
        details.map((detail) => [detail.labelId, detail.sentiment])
      ),
      comment,
      isSubmitted: false,
    }),
  reset: () => set(initial),
}))
