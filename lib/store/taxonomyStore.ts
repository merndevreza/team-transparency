import { create } from "zustand"
import { categories } from "@/lib/demo-data/dot-taxonomy"
import type { DotCategory } from "@/lib/demo-data/types"

interface TaxonomyState {
  categories: DotCategory[]
  addCategory: (name: string) => void
  renameCategory: (id: string, name: string) => void
  removeCategory: (id: string) => void
  addLabel: (categoryId: string, name: string) => void
  renameLabel: (id: string, name: string) => void
  removeLabel: (id: string) => void
}

export const useTaxonomyStore = create<TaxonomyState>()((set) => ({
  categories,
  addCategory: (name) =>
    set((s) => ({
      categories: [
        ...s.categories,
        { id: `cat-${Date.now().toString(36)}`, name: name.trim(), labels: [] },
      ],
    })),
  renameCategory: (id, name) =>
    set((s) => ({
      categories: s.categories.map((category) =>
        category.id === id ? { ...category, name: name.trim() } : category
      ),
    })),
  removeCategory: (id) =>
    set((s) => ({
      categories: s.categories.filter((category) => category.id !== id),
    })),
  addLabel: (categoryId, name) =>
    set((s) => ({
      categories: s.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              labels: [
                ...category.labels,
                {
                  id: `lbl-${Date.now().toString(36)}`,
                  categoryId,
                  name: name.trim(),
                },
              ],
            }
          : category
      ),
    })),
  renameLabel: (id, name) =>
    set((s) => ({
      categories: s.categories.map((category) => ({
        ...category,
        labels: category.labels.map((label) =>
          label.id === id ? { ...label, name: name.trim() } : label
        ),
      })),
    })),
  removeLabel: (id) =>
    set((s) => ({
      categories: s.categories.map((category) => ({
        ...category,
        labels: category.labels.filter((label) => label.id !== id),
      })),
    })),
}))
