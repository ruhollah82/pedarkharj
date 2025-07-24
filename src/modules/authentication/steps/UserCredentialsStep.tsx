import React from "react";
import { Button, Input, Typography, Row, Col } from "antd";
import Lottie from "lottie-react";
import userPasswordAnim from "../../../assets/Images/username.json";
import styles from "../SignUp.module.css";

const { Text } = Typography;

interface UserCredentialsStepProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleFinish: () => void;
  usernameError?: string;
  passwordError?: string;
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
  const invalidCharsPattern = /[!@#$%^&*()_\-+=\\|[\]{}"':;?\/><,.]/;

  const isPasswordValid = password.length >= 8;
  const isUsernameValid =
    !invalidCharsPattern.test(username) && username.length > 2;

  return (
    <div className={styles.center} style={{ textAlign: "center" }}>
      <Text strong style={{ display: "block", marginBottom: 16, fontSize: 18 }}>
        نام کاربری و رمزتو وارد کن
      </Text>

      <Lottie
        animationData={userPasswordAnim}
        loop={false}
        style={{ width: "50%", maxWidth: "300px", margin: "0 auto 24px" }}
      />

      <Row
        gutter={16}
        justify="center"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Col xs={24} md={12}>
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <Text>نام کاربری</Text>
          </div>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری"
            status={
              usernameError || (!isUsernameValid && username !== "")
                ? "error"
                : ""
            }
            style={{ width: "100%" }}
          />
          {(usernameError || (!isUsernameValid && username !== "")) && (
            <Text
              type="danger"
              style={{ display: "block", textAlign: "right", marginTop: 8 }}
            >
              {usernameError ||
                "نام کاربری باید تنها شامل اعداد و حروف فارسی و انگلیسی و بیشتر از ۲ کرکتر باشد"}
            </Text>
          )}
        </Col>

        <Col xs={24} md={12}>
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <Text>رمز عبور</Text>
          </div>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            status={
              passwordError || (!isPasswordValid && password !== "")
                ? "error"
                : ""
            }
            style={{ width: "100%" }}
          />
          {(passwordError || (!isPasswordValid && password !== "")) && (
            <Text
              type="danger"
              style={{ display: "block", textAlign: "right", marginTop: 8 }}
            >
              {passwordError || "رمز عبور باید حداقل شامل ۸ کرکتر باشد"}
            </Text>
          )}
        </Col>
      </Row>

      <div style={{ marginTop: 32 }}>
        <Button
          type="primary"
          onClick={handleFinish}
          disabled={!isPasswordValid || !isUsernameValid}
          style={{ minWidth: 120, height: 40 }}
        >
          ثبت‌نام
        </Button>
      </div>
    </div>
  );
};

export default UserCredentialsStep;
