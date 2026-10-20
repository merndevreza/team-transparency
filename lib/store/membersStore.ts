import { create } from "zustand"
import { users } from "@/lib/demo-data/users"
import type { Profile, UserRole } from "@/lib/data/types"

interface MembersState {
  members: Profile[]
  addMember: (payload: { name: string; email: string; role: UserRole }) => void
  updateMember: (
    id: string,
    payload: { name: string; email: string; role: UserRole }
  ) => void
  toggleRole: (id: string) => void
  toggleStatus: (id: string) => void
  removeMember: (id: string) => void
}

export const useMembersStore = create<MembersState>()((set) => ({
  members: users,
  addMember: ({ name, email, role }) =>
    set((s) => ({
      members: [
        ...s.members,
        {
          id: `u-${Date.now().toString(36)}`,
          name: name.trim(),
          email: email.trim(),
          role,
          status: "active",
          lastLoginAt: null,
          joinedAt: new Date().toISOString(),
        },
      ],
    })),
  updateMember: (id, { name, email, role }) =>
    set((s) => ({
      members: s.members.map((member) =>
        member.id === id
          ? { ...member, name: name.trim(), email: email.trim(), role }
          : member
      ),
    })),
  toggleRole: (id) =>
    set((s) => ({
      members: s.members.map((member) =>
        member.id === id
          ? { ...member, role: member.role === "admin" ? "member" : "admin" }
          : member
      ),
    })),
  toggleStatus: (id) =>
    set((s) => ({
      members: s.members.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "active" ? "inactive" : "active",
            }
          : member
      ),
    })),
  removeMember: (id) =>
    set((s) => ({ members: s.members.filter((member) => member.id !== id) })),
}))
