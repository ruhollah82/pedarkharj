import React, { useState, useEffect } from "react";
import { Box, Typography, Slide, LinearProgress } from "@mui/material"; // Import Slide
import styles from "./SignUp.module.css";
import Container from "../../container/Container";
import PhoneNumberStep from "./steps/EnterPhoneNumberStep";
import VerificationCodeStep from "./steps/VerificationCodeStep";
import UserCredentialsStep from "./steps/UserCredentialsStep";
import CustomSnackbar from "./CustomSnackbar";
import useAuth from "../../../hooks/useAuth";
import ProgresBar from "../../progresBar/progresBar";
import EnterPasswordStep from "./steps/EnterPasswordStep";

const AuthenticationPage: React.FC = () => {
  const {
    sendVerificationCode,
    verifyNumber,
    errors,
    finishSignUp,
    checkNumberExist,
  } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);
  const [apiToken, setApiToken] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const [waiting, setWaiting] = useState(false);

  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarState({ open: true, message, severity });
  };

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const checkNumber = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      showSnackbar("شماره تلفن نامعتبر", "error");
      return;
    }

    setWaiting(true); // Start progress bar
    await sleep(2000); // Simulate waiting time

    try {
      const isExist = await checkNumberExist(countryCode + phoneNumber);
      console.log(isExist);

      if (isExist === undefined) {
        showSnackbar("خطای دسترسی به سرور", "error");
      } else if (isExist === "true") {
        setSlideDirection("left");
        setActiveStep(100); // For existing numbers
      } else if (isExist === "false") {
        setSlideDirection("left");
        await sendVerificationCode(countryCode + phoneNumber, showSnackbar);
        setActiveStep(1); // For new numbers
      }
    } catch (error) {
      console.error("Error checking number:", error);
      showSnackbar("خطا در بررسی شماره تلفن", "error");
    } finally {
      setWaiting(false); // Stop progress bar
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      await checkNumber();
    } else if (activeStep === 1) {
      setWaiting(true); // Start progress bar
      await sleep(2000); // Simulate waiting time

      try {
        await sleep(2000); // Simulated waiting time (optional)
        const success = await verifyNumber(
          `${countryCode}${phoneNumber}`,
          verificationCode,
          "signup",
          showSnackbar
        );

        if (success) {
          setSlideDirection("left");
          setActiveStep(2); // Go to the next step
        }
      } catch (error) {
        console.error("Error verifying number:", error);
        showSnackbar("اوپس.. خطای غیر منتظره ای رخ داد", "error");
      } finally {
        setWaiting(false); // Stop progress bar
      }
    }
  };

  const handleBack = () => {
    setSlideDirection("right");

    if (activeStep === 100) {
      setActiveStep(0);
    } else if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    finishSignUp(countryCode + phoneNumber, username, password, showSnackbar);
  };
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // forgetPassword && alert("forgetpassword");
  return (
    <Container className={styles.container}>
      <ProgresBar active={waiting} />
      <Typography variant="h5" align="center" className={styles.title}>
        احراز هویت
      </Typography>
      <Box className={styles.form}>
        {activeStep === 0 && (
          <Slide
            in={activeStep === 0}
            direction={slideDirection}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <PhoneNumberStep
                Code={countryCode}
                setCountrycode={setCountryCode}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                handleNext={handleNext}
                error={errors.phoneError}
              />
            </div>
          </Slide>
        )}
        {activeStep === 1 && (
          <Slide
            in={activeStep === 1}
            direction={slideDirection}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <VerificationCodeStep
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                handleNext={handleNext}
                handleBack={handleBack}
                error={errors.codeError}
              />
            </div>
          </Slide>
        )}
        {activeStep === 2 && (
          <Slide
            in={activeStep === 2}
            direction={slideDirection}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <UserCredentialsStep
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleFinish={handleFinish}
                usernameError={errors.usernameError}
                passwordError={errors.passwordError}
              />
            </div>
          </Slide>
        )}
        {activeStep === 100 && (
          <Slide
            in={activeStep === 100}
            direction={slideDirection}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <EnterPasswordStep
                password={password}
                setPassword={setPassword}
                handleNext={handleNext}
                handleBack={handleBack}
                error={errors.codeError}
                // setForgetPassword={setForgetPassword}
              />
            </div>
          </Slide>
        )}
      </Box>
      <CustomSnackbar
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
      />
    </Container>
  );
};

export default AuthenticationPage;
