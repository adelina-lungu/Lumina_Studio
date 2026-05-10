const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5125/api";
const BACKEND_HOST = BASE_URL.replace(/\/api$/, "");

export function resolveImageUrl(src: string): string {
  if (src.startsWith("http")) return src;
  return `${BACKEND_HOST}${src}`;
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    const msg = typeof body === "object" && body && "message" in body
      ? (body as { message: string }).message
      : `Request failed with status ${status}`;
    super(msg);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function getToken(): string | null {
  return localStorage.getItem("lumina_token");
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem("lumina_token", token);
  else localStorage.removeItem("lumina_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let body: unknown;
    try { body = await res.json(); } catch { body = null; }
    throw new ApiError(res.status, body);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: "POST", body: formData }),
};
