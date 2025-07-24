// src/store/slices/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../services/API/apiList";
import {
  CheckNumberResponse,
  CheckNumberThunkResponse,
  LoginResponse,
} from "../../../types/types/auth.type";
import {
  setAuthCookie,
  getAuthCookie,
  removeAuthCookie,
} from "../../../utils/coockieHelper";

interface AuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isAuthenticated: boolean;
  isNumberExist: CheckNumberResponse | null;
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

// Initialize state from localStorage
const getInitialState = (): AuthState => {
  const accessToken = getAuthCookie("accessToken");
  const refreshToken = getAuthCookie("refreshToken");
  return {
    accessToken,
    refreshToken,
    isAuthenticated:
      accessToken !== undefined && accessToken !== "undefined" ? true : false,
    isNumberExist: null,
    otp: { sent: false, verified: false },
    loading: false,
    error: null,
    otpMode: null,
  };
};

const initialState: AuthState = getInitialState();

// Helper to update tokens in state and localStorage
const updateTokens = (
  state: AuthState,
  accessToken: string,
  refreshToken: string
) => {
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;

  (state.isAuthenticated =
    accessToken !== undefined && accessToken !== "undefined" ? true : false),
    setAuthCookie("accessToken", accessToken);
  setAuthCookie("refreshToken", refreshToken);
  // const expiresIn = 60 * 60 * 1000; // 1 hour in ms
  // const expirationTime = new Date().getTime() + expiresIn;
  // localStorage.setItem("tokenExpiration", expirationTime.toString());
};

const resetAuthState = (state: AuthState) => {
  state.accessToken = undefined;
  state.refreshToken = undefined;
  state.isAuthenticated = false;
  state.otp = { sent: false, verified: false };
  state.otpMode = null;
  state.error = null;
  removeAuthCookie("accessToken");
  removeAuthCookie("refreshToken");
};

// Async Thunks
export const login = createAsyncThunk<
  LoginResponse,
  { number: string; password: string }
>(
  "auth/login",
  async (
    credentials: { number: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API.postLogIn, credentials);
      return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
        fullResponse: response,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Login failed");
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
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      };
    } catch (error: any) {
      return rejectWithValue("Session expired. Please login again");
    }
  }
);

export const checkNumber = createAsyncThunk<
  CheckNumberThunkResponse, // Return type
  { number: string }, // Argument type
  { rejectValue: string } // Rejection type (optional but recommended)
>("auth/checkNumber", async (phoneNumber, { rejectWithValue }) => {
  try {
    const response = await axios.post(API.postCheckNumber, phoneNumber);
    return { isExist: response.data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Check number failed");
  }
});

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

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: AuthState };

    try {
      await axios.post(API.postLogOut, null, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
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
        headers: { Authorization: `Bearer ${auth.accessToken}` },
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
        updateTokens(
          state,
          action.payload.accessToken,
          action.payload.refreshToken
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Check Number
      .addCase(checkNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isNumberExist = null; // reset previous result
      })
      .addCase(checkNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.isNumberExist = action.payload.isExist;
      })
      .addCase(checkNumber.rejected, (state, action) => {
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        setAuthCookie("accessToken", action.payload.accessToken);
        setAuthCookie("refreshToken", action.payload.refreshToken);
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
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        updateTokens(
          state,
          action.payload.accessToken,
          action.payload.refreshToken
        );
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        resetAuthState(state);
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, resetAuthState)
      .addCase(logout.rejected, (state, action) => {
        resetAuthState(state);
        state.error = action.payload as string;
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.isAuthenticated = false;
        state.otp = { sent: false, verified: false };
        state.otpMode = null;
        removeAuthCookie("accessToken");
        removeAuthCookie("refreshToken");
      })

      // Logout All
      .addCase(logoutAll.fulfilled, (state) => {
        resetAuthState(state);
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.isAuthenticated = false;
        state.otp = { sent: false, verified: false };
        state.otpMode = null;
        removeAuthCookie("accessToken");
        removeAuthCookie("refreshToken");
      });
  },
});

export const { clearError, clearOTP } = authSlice.actions;
export default authSlice.reducer;
