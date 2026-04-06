const SESSION_KEY = "twelve_admin_login_at";
const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export function setAdminSession() {
  sessionStorage.setItem(SESSION_KEY, Date.now().toString());
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSessionAge(): number {
  const ts = sessionStorage.getItem(SESSION_KEY);
  if (!ts) return Infinity;
  return Date.now() - parseInt(ts, 10);
}

export function isAdminSessionValid(): boolean {
  return getSessionAge() < TIMEOUT_MS;
}

export function getRemainingMs(): number {
  return Math.max(0, TIMEOUT_MS - getSessionAge());
}
