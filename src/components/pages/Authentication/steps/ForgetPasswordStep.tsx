import React from "react";
import { Button, TextField, Box, Typography, Link } from "@mui/material";
import Lottie from "lottie-react";
import verificationAnim from "../../../../assets/images/verification.json";
import styles from "../SignUp.module.css";
import useCountdown from "../../../../hooks/useCountdown";

interface VerificationCodeStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  error: string;
  seconds: number;
}

const VerificationCodeStep: React.FC<VerificationCodeStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleNext,
  handleBack,
  error,
  seconds,
}) => {
  const countdown = useCountdown(seconds);

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
        error={!!error}
        helperText={error}
        sx={{ width: "15rem" }}
      />
      <Button disabled={countdown !== "00:00"}>
        {`ارسال مجدد ${countdown !== "00:00" ? countdown : ""}`}
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

export default VerificationCodeStep;
