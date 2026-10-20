import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"

// Email links (e.g. password recovery) land here with a token_hash —
// exchange it for a session, then continue to `next`.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const next = searchParams.get("next") ?? "/"

  if (tokenHash && type) {
    const supabase = createClient(await cookies())
    const { error } = await supabase.auth.verifyOtp({
      type: type as "recovery" | "email",
      token_hash: tokenHash,
    })
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=link_expired", request.url)
  )
}
