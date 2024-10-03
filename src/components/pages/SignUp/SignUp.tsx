import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Typography,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import Lottie from "lottie-react";
import phoneNumberAnim from "../../../assets/images/phoneNumber.json";
import verificationAnim from "../../../assets/images/verification.json";
import styles from "./SignUp.module.css";
import Container from "../../container/Container";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const SignupPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("");
  const [responsCode, setCode] = useState("");

  const [errors, setErrors] = useState({
    phoneError: "",
    codeError: "",
    passwordError: "",
  });

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

  const { signup } = useAuth();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+989\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateUsername = (username: string) => {};

  const sendVerificationCode = async (): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:1111/api/v1/users/verify-number",
        {
          number: phoneNumber,
          token: "",
          code: 0,
        }
      );
      console.log(response);
      if (response.data.token != undefined && response.data.token != "") {
        setApiToken(response.data.token);
        showSnackbar("کد تایید فرستاده شد", "info");
        return true; // Return true for successful verification
      } else {
        showSnackbar("خطا در ارسال کد تایید", "warning");
        return false; // Return false if verification failed
      }
    } catch (error: any) {
      const errorMessage = showSnackbar(
        error.response?.data?.message || "خطای دسترسی به سرور",
        "error"
      );
      return false; // Return false if there was an error
    }
  };
  const verifyNumber = async (): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:1111/api/v1/users/verify-number",
        {
          number: phoneNumber,
          token: apiToken,
          code: +verificationCode,
        }
      );
      console.log(response.data);
      if (response.data.access != undefined) {
        setAccess(response.data.access);
        // showSnackbar("اعتبار سنجی با موفقیت انجام شد", "success");
        return true; // Return true for successful verification
      } else {
        showSnackbar("کد تایید نامعتبر", "warning");
        return false; // Return false if verification failed
      }
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || "اعتبار سنجی کد نامعتبر",
        "error"
      );
      return false; // Return false if there was an error
    }
  };

  const handleNext = async () => {
    if (activeStep === 0 && !validatePhoneNumber(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneError: "شماره تلفن نامعتبر، لطفا شماره تلفن را صحیح وارد کنید.",
      }));
      return;
    } else if (activeStep === 1 && verificationCode.length !== 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        codeError: "کد تایید باید ۵ رقم باشد.",
      }));
      return;
    } else if (activeStep === 2 && password == "" && password.length <= 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      }));
      return;
    }

    setErrors({ phoneError: "", codeError: "", passwordError: "" });
    setDirection("left");

    if (activeStep === 0) {
      const isValid = await sendVerificationCode(); // Send verification code and wait for the result
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to the next step after sending
      }
    } else if (activeStep === 1) {
      const isValid = await verifyNumber(); // Verify the number and wait for the result
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to the next step if valid
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1); // Move to the next step for other cases
    }
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1111/api/v1/users/signup",
        {
          name: username,
          number: phoneNumber,
          password: password,
          token: apiToken, // Use the stored token here
        }
      );
      console.log(response);
      showSnackbar("ثبت‌نام با موفقیت انجام شد.", "success");
    } catch (error: any) {
      console.error("Signup error:", error);
      showSnackbar("ثبت نام ناموفق", "error");
    }
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" className={styles.title}>
        ثبت‌نام
      </Typography>

      <Box className={styles.form}>
        <Box>
          {activeStep === 0 && (
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box className={styles.center}>
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
                  error={!!errors.phoneError}
                  helperText={errors.phoneError}
                />
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.button}
                    type="submit"
                    disabled={!phoneNumber}
                  >
                    بعدی
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}

          {activeStep === 1 && (
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box className={styles.center}>
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
                  error={!!errors.codeError}
                  helperText={errors.codeError}
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
                    onClick={() => {
                      // verifyNumber();
                      handleNext();
                    }}
                    className={styles.button}
                    type="submit"
                    disabled={!verificationCode}
                  >
                    بعدی
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}

          {activeStep === 2 && (
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box className={styles.center}>
                <TextField
                  fullWidth
                  label="نام کاربری"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  type="password"
                  fullWidth
                  label="رمز"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.passwordError}
                  helperText={errors.passwordError}
                />
                <Box className={styles.handlebutton}>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    className={styles.button}
                  >
                    قبلی
                  </Button> */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    className={styles.button}
                    type="submit"
                  >
                    ! تمام
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={() => setSnackbarState({ ...snackbarState, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarState({ ...snackbarState, open: false })}
          severity={snackbarState.severity}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupPage;
