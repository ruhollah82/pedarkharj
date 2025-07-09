import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";
import useCountdown from "../../../hooks/useCountdown";

interface ForgetPasswordStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  error: string | undefined;
  seconds: number;
  sendVerificationCode: () => void;
}

const ForgetPasswordStep: React.FC<ForgetPasswordStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleNext,
  handleBack,
  error,
  seconds,
  sendVerificationCode,
}) => {
  const [triggerCountdown, setTriggerCountdown] = useState(0);
  const countDown = useCountdown(seconds, triggerCountdown);

  const handleResendCode = () => {
    sendVerificationCode();
    setTriggerCountdown((prev) => prev + 1); // Update to restart the countdown
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
      handleNext();
    }
  };

  return (
    <Box className={styles.center}>
      <Typography sx={{ direction: "rtl" }}>
        برای راستی آزمایی، ما یک کد اعتبار سنجی به شماره تلفنت ارسال کردیم
      </Typography>
      <Lottie
        animationData={verificationAnim}
        loop={false}
        style={{ width: "50%" }}
      />
      <TextField
        fullWidth
        label="کد اعتبار سنجی"
        variant="outlined"
        margin="normal"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        sx={{ width: "15rem" }}
      />
      <Button disabled={countDown !== "00:00"} onClick={handleResendCode}>
        {`ارسال مجدد ${countDown !== "00:00" ? countDown : ""}`}
      </Button>
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

export default ForgetPasswordStep;
