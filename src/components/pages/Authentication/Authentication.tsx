import React, { useState } from "react";
import { Box, Typography, Slide, LinearProgress } from "@mui/material"; // Import Slide
import styles from "./SignUp.module.css";
import Container from "../../container/Container";
import PhoneNumberStep from "./EnterPhoneNumberStep";
import VerificationCodeStep from "./VerificationCodeStep";
import UserCredentialsStep from "./UserCredentialsStep";
import CustomSnackbar from "./CustomSnackbar";
import useAuth from "../../../hooks/useAuth";
import ProgresBar from "../../progresBar/progresBar";
import EnterPasswordStep from "./EnterPasswordStep";

const SignupPage: React.FC = () => {
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
    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      showSnackbar("شماره تلفن نامعتبر", "error");
      return;
    }
    const isExist = await checkNumberExist(countryCode + phoneNumber);
    console.log(isExist);
    if (isExist === undefined) {
      showSnackbar("خطای دسترسی به سرور", "error");
      return;
    } else if (isExist === "true") {
      // login page must be called
      setActiveStep(101);
      return;
    } else if (isExist === "false") {
      setActiveStep(1);
    }
  };

  const handleNext = async () => {
    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      showSnackbar("شماره تلفن نامعتبر", "error");
      return;
    }
    const isExist = await checkNumberExist(countryCode + phoneNumber);
    console.log(isExist);
    if (isExist === undefined) {
      showSnackbar("خطای دسترسی به سرور", "error");
      return;
    } else if (isExist === "true") {
      // login page must be called
      setActiveStep(101);
    } else if (isExist === "false") {
      setActiveStep(1);
    }
    if (activeStep === 0) {
      checkNumber();
      console.log(countryCode + phoneNumber);
      setWaiting(true);
      try {
        await sleep(2000);
        const success = await sendVerificationCode(
          `${countryCode}${phoneNumber}`,
          showSnackbar
        );
        setWaiting(false);

        if (success) {
          setSlideDirection("left");
          setActiveStep((prev) => prev + 1);
        } else {
          showSnackbar("خطا در ارسال کد تائید", "error");
        }
      } catch (error) {
        console.error(error);
        showSnackbar("اوپس.. خطای غیر منتظره ای رخ داد", "error");
        setWaiting(false);
      }
    } else if (activeStep === 1) {
      setWaiting(true);
      try {
        await sleep(2000); // Simulate waiting time

        // Verify the phone number
        const success = await verifyNumber(
          `${countryCode}${phoneNumber}`,
          verificationCode,
          showSnackbar
        );
        setWaiting(false);

        if (success) {
          setSlideDirection("left");
          setActiveStep((prev) => prev + 1);
        }
      } catch (error) {
        console.error(error);
        showSnackbar("اوپس.. خطای غیر منتظره ای رخ داد", "error");
        setWaiting(false);
      }
    }
  };

  const handleBack = () => {
    setSlideDirection("right"); // Set the direction for backward motion
    setActiveStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    finishSignUp(countryCode + phoneNumber, username, password, showSnackbar);
  };
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

export default SignupPage;
