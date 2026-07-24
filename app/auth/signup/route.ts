import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data.user, { status: 201 });
}
