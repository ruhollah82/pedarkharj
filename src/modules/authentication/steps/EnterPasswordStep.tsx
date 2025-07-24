import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Checkbox,
  Form,
  Alert,
  Spin,
  Flex,
  FormProps,
} from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";
import useAuthFlow from "../../../hooks/useAuthFlow";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Password from "antd/es/input/Password";

const { Text, Title } = Typography;

interface FieldType {
  password: string;
}

const EnterPasswordStep = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    phoneNumber,
    countryCode,
    waiting,
    errors,
    setPasswordError,
    clearPasswordError,
    prevStep,
    setPassword,
  } = useAuthFlow();

  const { loginUser } = useAuth();

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!values.password) return;

    try {
      setIsLoading(true);
      clearPasswordError();

      // Save password to context if needed for signup flow
      setPassword(values.password);

      // Perform login
      const loginSuccess = await loginUser({
        number: countryCode + phoneNumber,
        password: values.password,
      });
      console.log(
        "number: ",
        countryCode + phoneNumber,
        "pass: ",
        values.password
      );
      console.log(loginSuccess);

      if (loginSuccess) {
        // Redirect to dashboard on successful login
        navigate("/dashboard");
      } else {
        setPasswordError("رمز عبور نامعتبر است");
      }
    } catch (error: any) {
      setPasswordError(error.message || "خطا در ورود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password flow
    console.log("Forgot password clicked");
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", padding: 0 }}
      className={styles.center}
    >
      <div style={{ width: "100%", padding: 0, textAlign: "center" }}>
        <Spin spinning={waiting || isLoading}>
          <Title level={3} style={{ marginBottom: 16 }}>
            منتظرت بودیم! رمز عبورتو وارد کن تا وارد حسابت بشی ...
          </Title>

          <Lottie
            animationData={verificationAnim}
            loop={false}
            style={{ maxWidth: 300, margin: "0 auto 24px" }}
          />

          {errors.passwordError && (
            <Alert
              message={errors.passwordError}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}

          <Form<FieldType>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
          >
            <Form.Item<FieldType>
              name="password"
              rules={[
                {
                  required: true,
                  message: "لطفاً رمز عبور خود را وارد کنید",
                },
                {
                  min: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                },
              ]}
            >
              <Input.Password
                placeholder="رمز عبور"
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                }
                visibilityToggle={{ visible: showPassword }}
                style={{ width: "100%", maxWidth: 400, height: 45 }}
              />
            </Form.Item>

            {/* Remember Me Checkbox */}
            <Form.Item
              style={{ textAlign: "right", maxWidth: 400, margin: "0 auto" }}
            >
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ direction: "rtl" }}
              >
                مرا به خاطر بسپار
              </Checkbox>
            </Form.Item>

            <Button
              type="link"
              onClick={handleForgotPassword}
              style={{ margin: "8px 0 24px" }}
            >
              رمز عبورمو فراموش کردم
            </Button>

            <Flex gap={16} justify="center">
              <Button
                type="default"
                onClick={prevStep}
                size="large"
                style={{ minWidth: 100, height: 40 }}
              >
                قبلی
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                size="large"
                style={{ minWidth: 100, height: 40 }}
              >
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </Flex>
          </Form>
        </Spin>
      </div>
    </Flex>
  );
};

export default EnterPasswordStep;
