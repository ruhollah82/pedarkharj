// src/store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../services/API/apiList";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  otp: {
    sent: boolean;
    verified: boolean;
    phoneNumber?: string;
    token?: string; // Verification token from OTP flow
  };
  loading: boolean;
  error: string | null;
  otpMode: "signup" | "reset_password" | null; // Tracks OTP verification purpose
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  otp: {
    sent: false,
    verified: false,
  },
  loading: false,
  error: null,
  otpMode: null,
};

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { number: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API.postLogIn, credentials);
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    userData: {
      number: string;
      name: string;
      token: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API.postSignUp, userData);
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (number: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.postSendOTP, { number });
      // Assuming backend returns verification token in response
      return {
        phoneNumber: number,
        token: response.data.token,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "OTP send failed");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    data: {
      number: string;
      otp: number;
      token: string;
      mode: "signup" | "reset_password";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API.postVerifyOTP, data);
      return {
        mode: data.mode,
        token: data.token,
        nextStep: response.data.code, // 'go_signup' or 'go_reset_password'
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "OTP verification failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: {
      number: string;
      token: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(API.postResetPassword, data);
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Password reset failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      const response = await axios.post(API.postRefresh, {
        refresh: auth.refreshToken,
      });
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Token refresh failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      await axios.post(API.postLogOut, null, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const logoutAll = createAsyncThunk(
  "auth/logoutAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      await axios.post(API.postLogOutAll, null, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Logout all failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOTP: (state) => {
      state.otp = { sent: false, verified: false };
      state.otpMode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Send OTP
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.otp.sent = true;
        state.otp.phoneNumber = action.payload.phoneNumber;
        state.otp.token = action.payload.token;
      })

      // Verify OTP
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otp.verified = true;
        state.otpMode = action.payload.mode;
      })

      // Reset Password
      .addCase(resetPassword.fulfilled, (state) => {
        state.otp = { sent: false, verified: false };
        state.otpMode = null;
      })

      // Refresh Token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem("token", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.otp = { sent: false, verified: false };
        state.otpMode = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })

      // Logout All
      .addCase(logoutAll.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.otp = { sent: false, verified: false };
        state.otpMode = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { clearError, clearOTP } = authSlice.actions;
export default authSlice.reducer;
