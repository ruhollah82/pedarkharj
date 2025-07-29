import React, { useState } from "react";
import { Button, Input, Typography, Row, Col, Alert, Form } from "antd";
import Lottie from "lottie-react";
import userPasswordAnim from "../../../assets/Images/username.json";
import styles from "../SignUp.module.css";
import useAuthFlow from "../../../hooks/useAuthFlow";
import useAuth from "../../../hooks/useAuth";
import Cookies from "js-cookie";

const { Text } = Typography;

const UserCredentialsStep = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    username,
    password,
    setUsername,
    setPassword,
    nextStep,
    prevStep,
    clearErrors,
    errors,
    phoneNumber,
    tempToken,
  } = useAuthFlow();

  const { signupUser } = useAuth();

  const invalidCharsPattern = /[!@#$%^&*()_\-+=\\|[\]{}"':;?\/><,.]/;

  const handleFinish = async () => {
    try {
      setIsLoading(true);
      setSubmitError(null);
      clearErrors();

      await form.validateFields();

      const signupResponse = await signupUser({
        number: phoneNumber,
        name: username,
        token: tempToken,
        password: password,
      }).unwrap();

      console.log(signupResponse);

      Cookies.set("first_login", "true", {
        expires: 7, // Give them 7 days to complete
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

    } catch (error: any) {
      console.error("Signup error:", error);
      setSubmitError(
        error?.data?.message ||
          error?.message ||
          "خطا در ثبت نام. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    clearErrors();
    prevStep();
  };

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

      {submitError && (
        <Alert
          message={submitError}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
          closable
          onClose={() => setSubmitError(null)}
        />
      )}

      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{ username, password }}
      >
        <Row
          gutter={16}
          justify="center"
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <Col xs={24} md={12}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "لطفاً نام کاربری را وارد کنید" },
                {
                  pattern: /^[a-zA-Z0-9\u0600-\u06FF]{3,}$/,
                  message:
                    "نام کاربری باید حداقل ۳ حرف و فقط شامل حروف و اعداد باشد",
                },
                () => ({
                  validator(_, value) {
                    if (!value || !invalidCharsPattern.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("نام کاربری نمی‌تواند شامل کاراکترهای خاص باشد")
                    );
                  },
                }),
              ]}
            >
              <Input
                placeholder="نام کاربری"
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "لطفاً رمز عبور را وارد کنید" },
                {
                  min: 8,
                  message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                  message: "رمز عبور باید شامل حروف و اعداد باشد",
                },
              ]}
            >
              <Input.Password
                placeholder="رمز عبور"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ marginTop: 32 }}>
          <Button
            type="default"
            onClick={handleBack}
            style={{ marginRight: 16, minWidth: 100, height: 40 }}
          >
            قبلی
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ minWidth: 120, height: 40 }}
          >
            {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserCredentialsStep;
