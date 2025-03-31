// src/components/Signup/VerificationCodeStep.tsx
import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/images/verification.json";
import styles from "../SignUp.module.css";

interface VerificationCodeStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  error: string;
}

const VerificationCodeStep: React.FC<VerificationCodeStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleNext,
  handleBack,
  error,
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
        اممم... به نظر میرسه قبلا ثبت نام نکردی! ما به شماره تلفنت یک کد تایید
        ارسال کردیم.
      </Typography>
      <Lottie
        animationData={verificationAnim}
        loop={false}
        style={{ width: "50%" }}
      />
      <TextField
        fullWidth
        label="کد تایید"
        variant="outlined"
        margin="normal"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        sx={{ width: "15rem" }}
      />
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
          onClick={handleNext}
          type="submit"
          disabled={!verificationCode}
          className={styles.button}
        >
          بعدی
        </Button>
      </Box>
    </Box>
  );
};

export default VerificationCodeStep;
