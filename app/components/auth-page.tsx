"use client";

import { useEffect, useState } from "react";
import {
  fetchProfile,
  logout,
  type UserProfile,
} from "@/lib/auth-client";
import { AuthForm } from "./auth-form";

export function AuthPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Signed in
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            You are logged in as
          </p>
          <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
            {user.email}
          </p>

          <dl className="mt-6 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">User ID</dt>
              <dd className="mt-0.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                {user.id}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Member since</dt>
              <dd className="mt-0.5 text-zinc-700 dark:text-zinc-300">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-8 flex h-10 w-full items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <AuthForm onSuccess={() => fetchProfile().then(setUser)} />
    </div>
  );
}
