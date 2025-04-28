import { useState } from "react";
import useAuth from "./useAuth";
import { validatePhoneNumber } from "../utility/helpers";

export const useAuthentication = () => {
  const {
    sendVerificationCode,
    verifyNumber,
    finishSignUp,
    checkNumberExist,
    resendCodeTimer,
    login,
    errors,
  } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarState({ open: true, message, severity });
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validatePhoneNumber(phoneNumber)) {
        showSnackbar("شماره تلفن نامعتبر", "error");
        return;
      }

      setWaiting(true);
      try {
        const isExist = await checkNumberExist(
          countryCode + phoneNumber,
          showSnackbar
        );
        setSlideDirection("left");

        if (isExist === "true") setActiveStep(100);
        else if (
          isExist === "false" &&
          (await sendVerificationCode(countryCode + phoneNumber, showSnackbar))
        ) {
          setActiveStep(1);
        }
      } catch {
        showSnackbar("خطا در بررسی شماره تلفن", "error");
      } finally {
        setWaiting(false);
      }
    } else if (activeStep === 1) {
      setWaiting(true);
      try {
        if (
          await verifyNumber(
            countryCode + phoneNumber,
            verificationCode,
            "signup",
            showSnackbar
          )
        ) {
          setSlideDirection("left");
          setActiveStep(2);
        }
      } catch {
        showSnackbar("اوپس.. خطای غیر منتظره ای رخ داد", "error");
      } finally {
        setWaiting(false);
      }
    }
  };

  const handleBack = () => {
    setSlideDirection("right");
    setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleFinish = async () => {
    finishSignUp(countryCode + phoneNumber, username, password, showSnackbar);
  };

  const handleLogin = async () => {
    login(countryCode + phoneNumber, password);
  };

  const resendVerificationCode = async () => {
    setWaiting(true);
    try {
      if (
        await sendVerificationCode(`${countryCode}${phoneNumber}`, showSnackbar)
      ) {
        setSlideDirection("left");
        setActiveStep(101);
      }
    } catch {
      showSnackbar("اوپس.. خطای غیر منتظره ای رخ داد", "error");
    } finally {
      setWaiting(false);
    }
  };

  return {
    activeStep,
    slideDirection,
    waiting,
    snackbarState,
    setSnackbarState,
    handleNext,
    handleBack,
    handleFinish,
    handleLogin,
    resendVerificationCode,
    verificationCode,
    setVerificationCode,
    password,
    setPassword,
    username,
    setUsername,
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    resendCodeTimer,
    errors,
  };
};
