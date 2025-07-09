import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";

interface EnterPasswordStepProps {
  password: string;
  setPassword: (value: string) => void;
  handleLogin: () => void;
  handleBack: () => void;
  handleForgotPassword: () => void;
  error?: string;
  isLoading?: boolean;
}

const EnterPasswordStep: React.FC<EnterPasswordStepProps> = ({
  password,
  setPassword,
  handleLogin,
  handleBack,
  handleForgotPassword,
  error,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && password) {
      handleLogin();
    }
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 30;
    if (password.length < 8) return 60;
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 80;
    return 100;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 30) return "#ff0000";
    if (strength < 60) return "#ff9100";
    if (strength < 80) return "#ffee00";
    return "#00ff00";
  };

  return (
    <Box className={styles.center}>
      <Typography sx={{ direction: "rtl", mb: 2 }}>
        منتظرت بودیم! رمز عبورتو وارد کن تا وارد حسابت بشی ...
      </Typography>

      <Lottie
        animationData={verificationAnim}
        loop={false}
        style={{ width: "50%", maxWidth: "300px" }}
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
        sx={{ width: "20rem", mt: 3 }}
        aria-label="Password input"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Password Strength Indicator */}
      <Box sx={{ width: "20rem", mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={getPasswordStrength()}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#f0f0f0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getStrengthColor(),
              borderRadius: 3,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            mt: 0.5,
            color: getStrengthColor(),
            fontWeight: "bold",
          }}
        >
          {password.length > 0
            ? `امنیت رمز عبور: ${getPasswordStrength()}%`
            : ""}
        </Typography>
      </Box>

      {/* Remember Me Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            color="primary"
          />
        }
        label="مرا به خاطر بسپار"
        sx={{
          width: "20rem",
          justifyContent: "flex-end",
          mt: 1,
        }}
      />

      <Button
        onClick={handleForgotPassword}
        sx={{ mt: 1, mb: 2, color: "primary.main" }}
      >
        رمز عبورمو فراموش کردم
      </Button>

      <Box className={styles.handlebutton} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          className={styles.button}
          sx={{ mr: 1 }}
        >
          قبلی
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={!password || isLoading}
          className={styles.button}
          sx={{ ml: 1 }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>در حال ورود...</span>
              <Box sx={{ width: 24, height: 24, ml: 1 }}>
                <div className={styles.spinner}></div>
              </Box>
            </Box>
          ) : (
            "ورود"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default EnterPasswordStep;
