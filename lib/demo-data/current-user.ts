import { getUserById } from "./users"

export const CURRENT_USER_ID = "u-01"

export const getCurrentUser = () => {
  const user = getUserById(CURRENT_USER_ID)
  if (!user) throw new Error("Demo current user is missing")
  return user
}
