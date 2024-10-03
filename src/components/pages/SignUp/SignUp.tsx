import React, { useState } from "react";
import {
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
import userPasswordAnim from "../../../assets/images/username.json";
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
    usernameError: "",
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

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+989\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateUsername = (username: string): string => {
    const minLength = 3;
    const maxLength = 20;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (username.length < minLength || username.length > maxLength) {
      return `نام کاربری باید بین ${minLength} تا ${maxLength} کاراکتر باشد.`;
    }

    if (!usernameRegex.test(username)) {
      return "نام کاربری باید فقط شامل حروف، اعداد و زیرخط باشد.";
    }

    return "";
  };

  const validatePassword = (password: string): string => {
    if (password === "" || password.length <= 6) {
      return "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    }
    return "";
  };

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
      if (response.data.token !== undefined && response.data.token !== "") {
        setApiToken(response.data.token);
        showSnackbar("کد تایید فرستاده شد", "info");
        return true; // Return true for successful verification
      } else {
        showSnackbar("خطا در ارسال کد تایید", "warning");
        return false; // Return false if verification failed
      }
    } catch (error: any) {
      showSnackbar(
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
      if (response.data.access !== undefined) {
        setAccess(response.data.access);
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
    if (activeStep === 0) {
      await handlePhoneNumberStep();
    } else if (activeStep === 1) {
      await handleVerificationCodeStep();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handlePhoneNumberStep = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneError: "شماره تلفن نامعتبر، لطفا شماره تلفن را صحیح وارد کنید.",
      }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, phoneError: "" }));
    setDirection("left");

    const isValid = await sendVerificationCode();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleVerificationCodeStep = async () => {
    if (verificationCode.length !== 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        codeError: "کد تایید باید ۵ رقم باشد.",
      }));
      return;
    }

    setErrors((prevErrors) => ({ ...prevErrors, codeError: "" }));
    setDirection("left");

    const isValid = await verifyNumber();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    const error = validateUsername(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      usernameError: error,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordError: error,
    }));
  };

  const handleFinish = async () => {
    if (errors.usernameError || errors.passwordError) {
      return; // If there are errors, prevent submission
    }

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

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getTextFieldStyle = (error: string) => ({
    border: error
      ? "1px solid red"
      : username && !error
      ? "1px solid green"
      : undefined,
  });

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
                <Typography>
                  شماری ای که میخای باهاش ثبت نام کنی رو وارد کن
                </Typography>
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
                  error={!!errors.codeError}
                  helperText={errors.codeError}
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
                <Typography>نام کاربری و رمزتو وارد کن </Typography>
                <Lottie
                  animationData={userPasswordAnim}
                  loop={false}
                  style={{ width: "50%" }}
                />
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <TextField
                    fullWidth
                    label="نام کاربری"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={handleUsernameChange}
                    error={!!errors.usernameError}
                    helperText={errors.usernameError}
                  />
                  <TextField
                    fullWidth
                    label="رمز عبور"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!errors.passwordError}
                    helperText={errors.passwordError}
                  />
                </Box>
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    className={styles.button}
                    type="submit"
                    disabled={
                      !username ||
                      !password ||
                      !!errors.usernameError ||
                      !!errors.passwordError
                    }
                  >
                    ثبت‌نام
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupPage;
