import { useAuthStore } from "@/store/authStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL environment variable is not defined.");
}

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) return null;

      const data = await response.json();

      if (data?.data?.token) {
        useAuthStore
          .getState()
          .setAuth(
            useAuthStore.getState().username ?? "",
            data.data.token,
            data.data.refresh_token ?? refreshToken,
          );
        return data.data.token as string;
      }

      return null;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {},
  _retry = true,
): Promise<T> => {
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && _retry) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      return fetchAPI<T>(endpoint, options, false);
    }

    // Refresh gagal
    useAuthStore.getState().logout();
    window.location.replace("/login");
    throw new Error("Sesi berakhir. Silakan login kembali.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.msg || "Terjadi kesalahan pada server",
    );
  }

  return response.json() as Promise<T>;
};
