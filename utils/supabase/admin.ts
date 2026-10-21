import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Admin (service-role) client for operations the publishable key cannot do,
// e.g. creating auth users on behalf of an admin. Server-only: the service
// role key bypasses RLS and must never reach the browser — read it only in
// server actions/route handlers, never prefix it with NEXT_PUBLIC_.
export const createAdminClient = () => {
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set — add it to .env.local (Dashboard → Settings → API)"
    )
  }
  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
