const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export type UserProfile = {
  id: string;
  email: string;
  created_at: string;
};

export async function login(
  email: string,
  password: string,
): Promise<{ access_token: string; refresh_token: string }> {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Login failed");
  }

  return data;
}

export async function signup(
  email: string,
  password: string,
): Promise<void> {
  const res = await fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Signup failed");
  }
}

export async function logout(): Promise<void> {
  const token = getAccessToken();
  if (!token) return;

  await fetch("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  clearTokens();
}

export async function fetchProfile(): Promise<UserProfile> {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await fetch("/protected/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    clearTokens();
    throw new Error(data.error ?? "Session expired");
  }

  return data;
}
