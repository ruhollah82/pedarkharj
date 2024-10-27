// src/components/Signup/UserCredentialsStep.tsx
import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import userPasswordAnim from "../../../assets/images/username.json";
import styles from "./SignUp.module.css";

interface UserCredentialsStepProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleFinish: () => void;
  usernameError: string;
  passwordError: string;
}

const UserCredentialsStep: React.FC<UserCredentialsStepProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  handleFinish,
  usernameError,
  passwordError,
}) => {
  return (
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
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          fullWidth
          label="رمز عبور"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />
      </Box>
      <Box className={styles.handlebutton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinish}
          type="submit"
          disabled={
            !username || !password || !!usernameError || !!passwordError
          }
          className={styles.button}
        >
          ثبت‌نام
        </Button>
      </Box>
    </Box>
  );
};

export default UserCredentialsStep;
