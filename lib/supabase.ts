import { createClient } from "@supabase/supabase-js";

// Loaded from .env.local by Next.js (server-side only — not prefixed with NEXT_PUBLIC_)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_KEY. Set them in .env.local.",
  );
}

// Shared Supabase client for auth routes and other server code
export const supabase = createClient(supabaseUrl, supabaseKey);
