import { fetchAPI } from "@/config/fetcher";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponseData {
  username: string;
  token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface LoginResponse {
  error: boolean;
  msg: string;
  data: LoginResponseData;
}

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetchAPI<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.error) {
    throw new Error(
      response.msg || "Login gagal. Periksa kembali kredensial anda.",
    );
  }

  return response;
};
