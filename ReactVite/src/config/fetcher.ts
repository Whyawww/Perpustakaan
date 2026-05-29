import { useAuthStore } from "../store/authStore";

const BASE_URL = "http://localhost:8080/api/v1";

export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = useAuthStore.getState().token;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // JWT Expired
    if (response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Terjadi kesalahan pada server");
  }

  return response.json();
};
