import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/** GET /protected/profile — requires Authorization: Bearer <access_token> */
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  // Expect "Bearer <token>"; reject missing / malformed headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 },
    );
  }

  // Extract the JWT from the Authorization header
  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 },
    );
  }

  // Verify the token with Supabase (rejects expired, tampered, or invalid JWTs)
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }

  // Return only secure profile metadata — not the full auth payload
  const { id, email, created_at } = data.user;

  return NextResponse.json({ id, email, created_at }, { status: 200 });
}
