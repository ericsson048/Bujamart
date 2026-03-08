import type { AuthUser } from "./api";

const AUTH_USER_KEY = "bujamart_user";
const AUTH_TOKEN_KEY = "bujamart_access_token";
const REFRESH_TOKEN_KEY = "bujamart_refresh_token";
export type UserProfile = "guest" | "client" | "admin";

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser): void {
  if (user.access_token) {
    localStorage.setItem(AUTH_TOKEN_KEY, user.access_token);
  }
  if (user.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, user.refresh_token);
  }
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (storedToken) {
    return storedToken;
  }
  const user = getCurrentUser();
  if (user?.access_token) {
    return user.access_token;
  }
  return null;
}

export function getRefreshToken(): string | null {
  const stored = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (stored) {
    return stored;
  }
  const user = getCurrentUser();
  if (user?.refresh_token) {
    return user.refresh_token;
  }
  return null;
}

export function setAuthTokens(accessToken: string | null, refreshToken: string | null): void {
  if (accessToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function isAdmin(): boolean {
  return getCurrentRole() === "admin";
}

export function getCurrentRole(): UserProfile {
  const user = getCurrentUser();
  if (!user) {
    return "guest";
  }
  if (user.role === "admin" || user.is_admin) {
    return "admin";
  }
  return "client";
}
