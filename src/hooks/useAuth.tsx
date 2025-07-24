// src/hooks/useAuth.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { RootState } from "../app/store/store";
import {
  login,
  signup,
  checkNumber,
  sendOTP,
  verifyOTP,
  resetPassword,
  refreshToken,
  logout,
  logoutAll,
  clearError,
  clearOTP,
} from "../app/store/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { CheckNumberThunkResponse } from "../types/types/auth.type";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state: RootState) => state.auth);

  // Wrapper functions with proper typing
  const loginUser = useCallback(
    (credentials: { number: string; password: string }) =>
      dispatch(login(credentials)),
    [dispatch]
  );

  const signupUser = useCallback(
    (userData: {
      number: string;
      name: string;
      token: string;
      password: string;
    }) => dispatch(signup(userData)),
    [dispatch]
  );

  const checkPhoneNumber = useCallback(
    async (phoneNumber: { number: string }) => {
      const resultAction = await dispatch(checkNumber(phoneNumber));
      return unwrapResult(resultAction) as CheckNumberThunkResponse;
    },
    [dispatch]
  );

  const sendOtp = useCallback(
    (number: string) => dispatch(sendOTP(number)),
    [dispatch]
  );

  const verifyOtp = useCallback(
    (data: {
      number: string;
      otp: number;
      token: string;
      mode: "signup" | "reset_password";
    }) => dispatch(verifyOTP(data)),
    [dispatch]
  );

  const resetUserPassword = useCallback(
    (data: { number: string; token: string; password: string }) =>
      dispatch(resetPassword(data)),
    [dispatch]
  );

  const refreshAuthToken = useCallback(
    () => dispatch(refreshToken()),
    [dispatch]
  );

  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);
  const logoutAllSessions = useCallback(
    () => dispatch(logoutAll()),
    [dispatch]
  );
  const clearAuthError = useCallback(() => dispatch(clearError()), [dispatch]);
  const clearOtpState = useCallback(() => dispatch(clearOTP()), [dispatch]);

  return {
    ...authState,
    loginUser,
    signupUser,
    checkPhoneNumber,
    sendOtp,
    verifyOtp,
    resetUserPassword,
    refreshAuthToken,
    logoutUser,
    logoutAllSessions,
    clearAuthError,
    clearOtpState,
  };
};

export default useAuth;
