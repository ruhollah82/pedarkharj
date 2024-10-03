import React, { useState } from "react";
import { Box, Typography, Slide } from "@mui/material"; // Import Slide
import styles from "./SignUp.module.css";
import Container from "../../container/Container";
import PhoneNumberStep from "./PhoneNumberStep";
import VerificationCodeStep from "./VerificationCodeStep";
import UserCredentialsStep from "./UserCredentialsStep";
import CustomSnackbar from "./CustomSnackbar";
import useSignup from "./useSignup";

const SignupPage: React.FC = () => {
  const { sendVerificationCode, verifyNumber, errors } = useSignup();
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  ); // Track the slide direction

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarState({ open: true, message, severity });
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const success = await sendVerificationCode(phoneNumber, showSnackbar);
      if (success) {
        setSlideDirection("right"); // Set the direction of the slide for forward motion
        setActiveStep((prev) => prev + 1);
      }
    } else if (activeStep === 1) {
      const success = await verifyNumber(
        phoneNumber,
        verificationCode,
        showSnackbar
      );
      if (success) {
        setSlideDirection("right"); // Set the direction for forward motion
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setSlideDirection("right"); // Set the direction for backward motion
    setActiveStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    // Handle finish logic
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" className={styles.title}>
        ثبت‌نام
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
      </Box>
      <CustomSnackbar
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
      />
    </Container>
  );
};

export default SignupPage;
