import React, { useState } from "react";
import { Box, Typography, Slide } from "@mui/material";
import styles from "./SignUp.module.css";
import Container from "../../layouts/Container/Container";
import ProgresBar from "../../components/progresBar/progresBar";
import CustomSnackbar from "./CustomSnackbar";
import { useAuthentication } from "../../hooks/useAuthentication";
import { StepComponents } from "./StepManager";

const AuthenticationPage: React.FC = () => {
  const {
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
  } = useAuthentication();

  return (
    <Container className={styles.container}>
      <ProgresBar active={waiting} />
      <Typography variant="h5" align="center" className={styles.title}>
        احراز هویت
      </Typography>
      <Box className={styles.form}>
        <Slide in direction={slideDirection} mountOnEnter unmountOnExit>
          <div>
            <StepComponents
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              handleFinish={handleFinish}
              handleLogin={handleLogin}
              resendVerificationCode={resendVerificationCode}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              resendCodeTimer={resendCodeTimer}
              errors={errors}
            />
          </div>
        </Slide>
      </Box>
      <CustomSnackbar
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
      />
    </Container>
  );
};

export default AuthenticationPage;
