import { AxiosResponse } from "axios";

// src/types/auth.type.ts
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  otp: {
    sent: boolean;
    verified: boolean;
    phoneNumber?: string;
    token?: string;
  };
  loading: boolean;
  error: string | null;
  otpMode: "signup" | "reset_password" | null;
}

export interface LoginCredentials {
  number: string;
  password: string;
}

export interface SignupData {
  number: string;
  name: string;
  token: string;
  password: string;
}

export interface VerifyOTPData {
  number: string;
  otp: number;
  token: string;
  mode: "signup" | "reset_password";
}

export interface CheckNumberResponse {
  code: string;
  isExist: boolean;
  status: number;
}
export interface CheckNumberThunkResponse {
  isExist: CheckNumberResponse;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  fullResponse: AxiosResponse<any, any>;
}
