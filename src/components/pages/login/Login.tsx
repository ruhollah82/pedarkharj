import React, { useState } from "react";
import {
  // Stepper,
  // Step,
  // StepLabel,
  Button,
  TextField,
  Box,
  Typography,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import Lottie from "lottie-react";
import verification from "../../../assets/images/verification.json";
import phoneNumber from "../../../assets/images/phoneNumber.json";
import styles from "./LoginPage.module.css";
import Container from "../../container/Container";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; // For redirect after login

// const steps = ["وارد کردن شماره تلفن", "رمز عبور"];

const LoginPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [errors, setErrors] = useState<{
    phoneError: string;
    passwordError: string;
  }>({
    phoneError: "",
    passwordError: "",
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const { login } = useAuth();
  const navigate = useNavigate(); // React Router's useNavigate hook

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^09\d{9}$/; // Regex to check if the phone starts with '09' and has exactly 11 digits
    return phoneRegex.test(phone);
  };

  const handleNext = () => {
    if (activeStep === 0 && !validatePhoneNumber(PhoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneError:
          "شماره تلفن نامعتبر، لطفا شماره تلفن خود را با 09 وارد کنید\nمثال: 09123456789",
      }));
      return;
    } else if (activeStep === 1 && password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "رمز عبور باید بیشتر از ۵ کارکتر باشد",
      }));
      return;
    }

    setErrors({ phoneError: "", passwordError: "" });
    setDirection("left");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      await login(PhoneNumber, password);
      console.log("Logged in successfully");
      navigate("/app/home");
    } catch (error: any) {
      setLoginError(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" className={styles.title}>
        ورود به حساب
      </Typography>

      {/* <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}

      <Box className={styles.form}>
        <Box>
          {activeStep === 0 && (
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box className={styles.center}>
                <Lottie
                  animationData={phoneNumber}
                  loop={false}
                  style={{ width: "50%" }}
                />
                <TextField
                  fullWidth
                  label="شماره تلفن"
                  variant="outlined"
                  margin="normal"
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!errors.phoneError}
                  helperText={errors.phoneError}
                />
                <Link to="/signup">حساب کاربری نداری؟ خب یکی بساز !</Link>
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.button}
                    type="submit"
                    disabled={!PhoneNumber}
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
                  animationData={verification}
                  loop={false}
                  style={{ width: "50%" }}
                />
                <TextField
                  type="password"
                  fullWidth
                  label="رمز عبور"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.passwordError}
                  helperText={errors.passwordError}
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
                    onClick={handleFinish}
                    className={styles.button}
                    type="submit"
                  >
                    تمام
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}

          {/* Snackbar for showing login errors */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error">
              {loginError}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
