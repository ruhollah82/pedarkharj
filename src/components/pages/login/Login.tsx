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
} from "@mui/material";
import Lottie from "lottie-react";
import verification from "../../../assets/images/verification.json";
import phoneNumber from "../../../assets/images/phoneNumber.json";
import done from "../../../assets/images/done.json";
import styles from "./LoginPage.module.css"; // You can still keep this for non-stepper related styles
import Container from "../../container/Container"; // Custom container component

const steps = ["Phone number", "Password", "Confirm"];

const LoginPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleNext = () => {
    setDirection("left");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    console.log("Form Submitted", { PhoneNumber, password });
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5" align="center" className={styles.title}>
        Login
      </Typography>

      {/* This Stepper will automatically use the global theme's styles */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

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
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  value={PhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.button}
                    type="submit"
                  >
                    Next
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
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    className={styles.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.button}
                    type="submit"
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}

          {activeStep === 2 && (
            <Slide direction={direction} in={true} mountOnEnter unmountOnExit>
              <Box className={styles.center}>
                <Lottie
                  animationData={done}
                  loop={false}
                  style={{ width: "50%" }}
                />
                <Typography variant="body1" gutterBottom>
                  Phone Number: {PhoneNumber}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Password: {password}
                </Typography>
                <Box className={styles.handlebutton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    className={styles.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFinish}
                    className={styles.button}
                    type="submit"
                  >
                    Finish
                  </Button>
                </Box>
              </Box>
            </Slide>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
