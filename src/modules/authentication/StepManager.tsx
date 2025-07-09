// src/features/auth/StepManager.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store/store";
import {
  setStep,
  setDirection,
  setPhoneNumber,
  setCountryCode,
  setUsername,
  setPassword,
  setVerificationCode,
  setPhoneError,
  setCodeError,
  setResendCodeTimer,
  setPasswordError,
} from "../../app/store/slices/authFlowSlice";
import {
  login,
  signup,
  verifyOTP,
  sendOTP,
  resetPassword,
} from "../../app/store/slices/authSlice";

import { showSnackbar } from "../../app/store/slices/snackbarSlice";
import PhoneNumberStep from "./steps/EnterPhoneNumberStep";
import VerificationCodeStep from "./steps/VerificationCodeStep";
import UserCredentialsStep from "./steps/UserCredentialsStep";
import EnterPasswordStep from "./steps/EnterPasswordStep";
import ForgetPasswordStep from "./steps/ForgetPasswordStep";
import { checkNumber } from "../../app/store/slices/userSlice";

export const StepComponents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authFlowState = useSelector((state: RootState) => state.authFlow);
  const authState = useSelector((state: RootState) => state.auth);

  const {
    activeStep,
    phoneNumber,
    countryCode,
    username,
    password,
    verificationCode,
    errors,
    resendCodeTimer,
  } = authFlowState;

  const { otp } = authState;

  const handleNext = () => {
    dispatch(setStep(activeStep + 1));
    dispatch(setDirection("left"));
  };

  const handleBack = () => {
    dispatch(setStep(Math.max(activeStep - 1, 0)));
    dispatch(setDirection("right"));
  };

  const handleFinish = async () => {
    try {
      const fullNumber = countryCode + phoneNumber;
      await dispatch(
        signup({
          number: fullNumber,
          name: username,
          token: otp.token || "",
          password,
        })
      ).unwrap();

      dispatch(
        showSnackbar({
          message: "ثبت نام با موفقیت انجام شد",
          severity: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "خطا در ثبت نام",
          severity: "error",
        })
      );
    }
  };

  const handleLogin = async () => {
    try {
      const fullNumber = countryCode + phoneNumber;
      await dispatch(
        login({
          number: fullNumber,
          password,
        })
      ).unwrap();

      dispatch(
        showSnackbar({
          message: "ورود با موفقیت انجام شد",
          severity: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "خطا در ورود",
          severity: "error",
        })
      );
    }
  };

  const resendVerificationCode = async () => {
    try {
      const fullNumber = countryCode + phoneNumber;
      await dispatch(sendOTP(fullNumber)).unwrap();

      // Start resend timer
      dispatch(setResendCodeTimer(60));

      // Use a ref to track the current timer value
      let currentTimer = 60;
      const timer = setInterval(() => {
        currentTimer -= 1;
        dispatch(setResendCodeTimer(currentTimer));

        if (currentTimer <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      dispatch(
        showSnackbar({
          message: "کد تأیید مجدداً ارسال شد",
          severity: "info",
        })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "خطا در ارسال کد تأیید",
          severity: "error",
        })
      );
    }
  };

  const handleSendOTP = async () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      dispatch(setPhoneError("لطفاً شماره تلفن معتبر وارد کنید"));
      return;
    }

    const fullNumber = countryCode + phoneNumber;
    try {
      const exists = await dispatch(checkNumber(fullNumber)).unwrap();
      console.log(fullNumber);

      if (exists) {
        // Existing user - go to password step
        dispatch(setStep(100));
      } else {
        // New user - send OTP and go to verification
        await dispatch(sendOTP(fullNumber)).unwrap();
        handleNext();
      }
    } catch (error: any) {
      console.log(fullNumber);

      dispatch(
        showSnackbar({
          message: error.message || "خطا در بررسی شماره تلفن",
          severity: "error",
        })
      );
    }
  };

  const handleVerifyOTP = async (mode: "signup" | "reset_password") => {
    // Validate verification code
    if (!verificationCode || verificationCode.length !== 5) {
      dispatch(setCodeError("لطفاً کد تأیید ۵ رقمی را وارد کنید"));
      return;
    }

    try {
      const fullNumber = countryCode + phoneNumber;
      await dispatch(
        verifyOTP({
          number: fullNumber,
          otp: parseInt(verificationCode),
          token: otp.token || "",
          mode,
        })
      ).unwrap();

      if (mode === "signup") {
        handleNext(); // Go to credentials step
      } else {
        // Handle password reset flow
        handlePasswordReset();
      }
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "خطا در تأیید کد",
          severity: "error",
        })
      );
    }
  };

  const handlePasswordReset = async () => {
    // Validate password
    if (!password || password.length < 6) {
      dispatch(setPasswordError("رمز عبور باید حداقل ۶ کاراکتر باشد"));
      return;
    }

    try {
      const fullNumber = countryCode + phoneNumber;
      await dispatch(
        resetPassword({
          number: fullNumber,
          token: otp.token || "",
          password,
        })
      ).unwrap();

      dispatch(
        showSnackbar({
          message: "رمز عبور با موفقیت تغییر یافت",
          severity: "success",
        })
      );

      // Go back to login step
      dispatch(setStep(100));
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "خطا در تغییر رمز عبور",
          severity: "error",
        })
      );
    }
  };

  // Initialize resend timer on component mount
  useEffect(() => {
    if (resendCodeTimer > 0) {
      const timer = setInterval(() => {
        const newValue = resendCodeTimer - 1;
        dispatch(setResendCodeTimer(newValue));

        if (newValue <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendCodeTimer, dispatch]);

  const stepComponents = {
    0: (
      <PhoneNumberStep
        setCountrycode={(val) => dispatch(setCountryCode(val))}
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={(val) => dispatch(setPhoneNumber(val))}
        handleNext={handleSendOTP}
        error={errors.phoneError}
        isLoading={authState.loading} // Pass loading state from auth slice
      />
    ),
    1: (
      <VerificationCodeStep
        verificationCode={verificationCode}
        setVerificationCode={(val) => dispatch(setVerificationCode(val))}
        handleNext={() => handleVerifyOTP("signup")}
        handleBack={handleBack}
        error={errors.codeError}
      />
    ),
    2: (
      <UserCredentialsStep
        username={username}
        setUsername={(val) => dispatch(setUsername(val))}
        password={password}
        setPassword={(val) => dispatch(setPassword(val))}
        handleFinish={handleFinish}
        usernameError={errors.usernameError}
        passwordError={errors.passwordError}
      />
    ),
    100: (
      <EnterPasswordStep
        password={password}
        setPassword={(val) => dispatch(setPassword(val))}
        handleLogin={handleLogin}
        handleBack={handleBack}
        handleForgotPassword={() => dispatch(setStep(101))}
        error={errors.passwordError}
      />
    ),
    101: (
      <ForgetPasswordStep
        error={errors.codeError}
        handleBack={handleBack}
        handleNext={() => handleVerifyOTP("reset_password")}
        setVerificationCode={(val) => dispatch(setVerificationCode(val))}
        verificationCode={verificationCode}
        seconds={resendCodeTimer}
        sendVerificationCode={resendVerificationCode}
      />
    ),
  };

  return stepComponents[activeStep as keyof typeof stepComponents] || null;
};
