// src/components/Signup/VerificationCodeStep.tsx
import React from "react";
import { Button, TextField, Box, Typography, Link } from "@mui/material";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";

interface EnterPasswordStepProps {
  password: string;
  setPassword: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleLogin: () => void;

  error: string | undefined;
  // setForgetPassword: (value: boolean) => void;
}

const EnterPasswordStep: React.FC<EnterPasswordStepProps> = ({
  password,
  setPassword,
  handleNext,
  handleBack,
  handleLogin,
  error,
  // setForgetPassword,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
      handleNext();
    }
  };
  return (
    <Box className={styles.center}>
      <Typography sx={{ direction: "rtl" }}>
        منتظرت بودیم! رمز عبورتو وارد کن تا وارد حسابت بشی ...
      </Typography>
      <Lottie
        animationData={verificationAnim}
        loop={false}
        style={{ width: "50%" }}
      />
      <TextField
        fullWidth
        label="رمز عبور"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        sx={{ width: "20rem" }}
        aria-label="Password input"
        type="password"
      />
      <Button onClick={() => handleNext()}>رمز عبورمو فراموش کردم</Button>

      <Box className={styles.handlebutton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          className={styles.button}
        >
          قبلی
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          type="submit"
          disabled={!password}
          className={styles.button}
        >
          ورود
        </Button>
      </Box>
    </Box>
  );
};

export default EnterPasswordStep;
