import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import userPasswordAnim from "../../../assets/Images/username.json";
import styles from "../SignUp.module.css";
import { green } from "@mui/material/colors";

interface UserCredentialsStepProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleFinish: () => void;
  usernameError: string | undefined;
  passwordError: string | undefined;
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
  const isPasswordValid = password.length >= 8;

  // Ensure username doesn't contain invalid characters
  const invalidCharsPattern = /[!@#$%^&*()_\-+=\\|[\]{}"':;?\/><,.]/;
  const isUsernameValid =
    !invalidCharsPattern.test(username) && username.length > 2;

  return (
    <Box className={styles.center}>
      <Typography>نام کاربری و رمزتو وارد کن</Typography>
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
          error={!!usernameError || (!isUsernameValid && username !== "")}
          helperText={
            usernameError || username === ""
              ? ""
              : isUsernameValid
              ? ""
              : "نام کاربری باید تنها شامل اعداد و حروف فارسی و انگلیسی و بیشتر از ۲ کرکتر باشد"
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  username === "" ? "" : isUsernameValid ? "green" : "red",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  username === "" ? "" : isUsernameValid ? "green" : "red",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="رمز عبور"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError || (!isPasswordValid && password !== "")}
          helperText={
            passwordError || password === ""
              ? ""
              : !isPasswordValid
              ? "رمز عبور باید حد اقل شامل ۸ کرکتر باشد"
              : ""
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  password === "" ? "" : isPasswordValid ? "green" : "red",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  password === "" ? "" : isPasswordValid ? "green" : "red", // Apply on focus
              },
            },
          }}
        />
      </Box>
      <Box className={styles.handlebutton}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinish}
          type="submit"
          disabled={!isPasswordValid || !isUsernameValid}
          className={styles.button}
        >
          ثبت‌نام
        </Button>
      </Box>
    </Box>
  );
};

export default UserCredentialsStep;
