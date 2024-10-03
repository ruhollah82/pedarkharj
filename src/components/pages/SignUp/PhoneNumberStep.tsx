// src/components/Signup/PhoneNumberStep.tsx
import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import phoneNumberAnim from "../../../assets/images/phoneNumber.json";
import styles from "./SignUp.module.css";

interface PhoneNumberStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleNext: () => void;
  error: string;
}

const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
  phoneNumber,
  setPhoneNumber,
  handleNext,
  error,
}) => {
  return (
    <Box className={styles.center}>
      <Typography>شماری ای که میخای باهاش ثبت نام کنی رو وارد کن</Typography>
      <Lottie
        animationData={phoneNumberAnim}
        loop={false}
        style={{ width: "50%" }}
      />
      <TextField
        fullWidth
        label="شماره تلفن"
        variant="outlined"
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Box className={styles.handlebutton}>
      <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          type="submit"
          disabled={!phoneNumber}
          className={styles.button}
        >
          بعدی
        </Button>
      </Box>
    </Box>
  );
};

export default PhoneNumberStep;
