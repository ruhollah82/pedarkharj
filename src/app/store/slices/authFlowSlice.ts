// src/features/auth/redux/authFlowSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthFlowState {
  activeStep: number;
  slideDirection: "left" | "right";
  waiting: boolean;
  phoneNumber: string;
  countryCode: string;
  username: string;
  password: string;
  verificationCode: string;
  resendCodeTimer: number;
  errors: {
    phoneError: string;
    codeError: string;
    usernameError: string;
    passwordError: string;
  };
}

const initialState: AuthFlowState = {
  activeStep: 0,
  slideDirection: "left",
  waiting: false,
  phoneNumber: "",
  countryCode: "+98", // Default for Iran
  username: "",
  password: "",
  verificationCode: "",
  resendCodeTimer: 0,
  errors: {
    phoneError: "",
    codeError: "",
    usernameError: "",
    passwordError: "",
  },
};

const authFlowSlice = createSlice({
  name: "authFlow",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setDirection: (state, action: PayloadAction<"left" | "right">) => {
      state.slideDirection = action.payload;
    },
    setWaiting: (state, action: PayloadAction<boolean>) => {
      state.waiting = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.errors.phoneError = "";
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.errors.usernameError = "";
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.errors.passwordError = "";
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
      state.errors.codeError = "";
    },
    setResendCodeTimer: (state, action: PayloadAction<number>) => {
      state.resendCodeTimer = action.payload;
    },
    setPhoneError: (state, action: PayloadAction<string>) => {
      state.errors.phoneError = action.payload;
    },
    setCodeError: (state, action: PayloadAction<string>) => {
      state.errors.codeError = action.payload;
    },
    setUsernameError: (state, action: PayloadAction<string>) => {
      state.errors.usernameError = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<string>) => {
      state.errors.passwordError = action.payload;
    },
    resetAuthFlow: () => initialState,
    decrementResendTimer: (state) => {
      if (state.resendCodeTimer > 0) {
        state.resendCodeTimer -= 1;
      }
    },
  },
});

export const {
  setStep,
  setDirection,
  setWaiting,
  setPhoneNumber,
  setCountryCode,
  setUsername,
  setPassword,
  setVerificationCode,
  setResendCodeTimer,
  setPhoneError,
  setCodeError,
  setUsernameError,
  setPasswordError,
  resetAuthFlow,
} = authFlowSlice.actions;

export default authFlowSlice.reducer;
