import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
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

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbarState({ open: true, message, severity });
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const success = await sendVerificationCode(phoneNumber, showSnackbar);
      if (success) setActiveStep((prev) => prev + 1);
    } else if (activeStep === 1) {
      const success = await verifyNumber(
        phoneNumber,
        verificationCode,
        showSnackbar
      );
      if (success) setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFinish = async () => {
    // Handle finish logic (e.g., create account)
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" className={styles.title}>
        ثبت‌نام
      </Typography>
      <Box className={styles.form}>
        {activeStep === 0 && (
          <PhoneNumberStep
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleNext={handleNext}
            error={errors.phoneError}
          />
        )}
        {activeStep === 1 && (
          <VerificationCodeStep
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            handleNext={handleNext}
            handleBack={handleBack} // Added handleBack prop
            error={errors.codeError}
          />
        )}
        {activeStep === 2 && (
          <UserCredentialsStep
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleFinish={handleFinish} // Added necessary props
            usernameError={errors.usernameError}
            passwordError={errors.passwordError}
          />
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
