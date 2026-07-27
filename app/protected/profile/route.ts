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

  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 },
    );
  }

  // Validate the JWT with Supabase and load the authenticated user
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json(
      { error: "Access token required" },
      { status: 401 },
    );
  }

  return NextResponse.json(data.user, { status: 200 });
}
