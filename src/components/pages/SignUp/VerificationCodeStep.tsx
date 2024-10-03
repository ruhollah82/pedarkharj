// src/components/Signup/VerificationCodeStep.tsx
import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/images/verification.json";

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
  return (
    <Box>
      <Typography>
        برای تایید شماره تلفنت، یک کد تایید به شمارت فرستادیم
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
        error={!!error}
        helperText={error}
        sx={{ width: "15rem" }}
      />
      <Box>
        <Button variant="contained" color="primary" onClick={handleBack}>
          قبلی
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          type="submit"
          disabled={!verificationCode}
        >
          بعدی
        </Button>
      </Box>
    </Box>
  );
};

export default VerificationCodeStep;
