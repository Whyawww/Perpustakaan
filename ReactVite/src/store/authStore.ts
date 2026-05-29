import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  token: string | null;
  refreshToken: string | null;
  setAuth: (username: string, token: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      username: null,
      token: null,
      refreshToken: null,
      setAuth: (username, token, refreshToken) =>
        set({ username, token, refreshToken }),
      logout: () => set({ username: null, token: null, refreshToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
