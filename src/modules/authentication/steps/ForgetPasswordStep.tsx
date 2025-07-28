import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Typography, Row, Col, Form, Alert, Flex } from "antd";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";
import useCountdown from "../../../hooks/useCountdown";
import useAuthFlow from "../../../hooks/useAuthFlow";
import useAuth from "../../../hooks/useAuth";

const { Text, Title } = Typography;

const ForgetPasswordStep = () => {
  const SECONDS = 15; // Countdown duration
  const [triggerCountdown, setTriggerCountdown] = useState(0);
  const countDown = useCountdown(SECONDS, triggerCountdown);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { phoneNumber, prevStep, nextStep, tempToken, setTempToken } =
    useAuthFlow();
  const { sendOtp, verifyOtp } = useAuth();

  useEffect(() => {
    console.log("ForgetPasswordStep mounted");
    return () => {
      console.log("ForgetPasswordStep unmounted");
    };
  }, []);

  // Initialize OTP sending on component mount
  const hasSentRef = useRef(false);

  useEffect(() => {
    if (!hasSentRef.current) {
      hasSentRef.current = true;
      sendVerificationCode();
    }
  }, []);

  const sendVerificationCode = async () => {
    try {
      setError(null);
      const response = await sendOtp(phoneNumber).unwrap();
      console.log("forget pass response :", response);
      if (response.token !== undefined) {
        setTempToken(response.token);
      }
      setTriggerCountdown((prev) => prev + 1);
    } catch (err) {
      setError("خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.");
    }
  };

  // ADDED THE MISSING FUNCTION
  const handleResendCode = () => {
    sendVerificationCode();
  };

  const handleSubmit = async (values: { verificationCode: string }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await verifyOtp({
        number: phoneNumber,
        otp: parseInt(values.verificationCode, 10),
        token: tempToken,
        mode: "reset_password",
      }).unwrap();
      console.log(response);
      // Proceed to password reset step
      if (response.nextStep === "go_reset_password") {
        console.log("OTP verified, proceed to password reset");
        nextStep();
      } else if (response.nextStep === "invalid_field") {
        setError("کد تایید نامعتبر است. لطفا دوباره تلاش کنید.");
      } else if (response.nextStep === "go_send_otp_first") {
        setError("کد تایید منقضی شده است لطفا دوباره امتحان کنید.");
      } else {
        setError("خطای نامعلوم.");
      }
    } catch (err: any) {
      setError("کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید.");
      form.setFields([
        {
          name: "verificationCode",
          errors: [err.message || "کد تأیید نامعتبر است"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", padding: 0 }}
      className={styles.center}
    >
      <Col xs={24} md={16} lg={12} xl={10} style={{ textAlign: "center" }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          بازیابی رمز عبور
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          برای راستی‌آزمایی، ما یک کد اعتبارسنجی به شماره تلفنت ارسال کردیم
        </Text>

        <Lottie
          animationData={verificationAnim}
          loop={false}
          style={{ maxWidth: 300, margin: "0 auto 24px" }}
        />

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="verificationCode"
            rules={[
              { required: true, message: "لطفاً کد تأیید را وارد کنید" },
              {
                pattern: /^\d{5}$/,
                message: "کد تأیید باید ۵ رقم باشد",
              },
            ]}
          >
            <Input.OTP
              length={5}
              formatter={(str) => str.toUpperCase()}
              autoFocus
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="link"
              onClick={handleResendCode}
              disabled={countDown !== "00:00"}
              style={{ margin: "8px 0 24px" }}
            >
              {countDown !== "00:00"
                ? `ارسال مجدد کد (${countDown})`
                : "ارسال مجدد کد تأیید"}
            </Button>
          </Form.Item>

          <Form.Item>
            <Row gutter={16} justify="center">
              <Col>
                <Button
                  type="default"
                  onClick={prevStep}
                  size="large"
                  style={{ minWidth: 100, height: 40 }}
                >
                  قبلی
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  size="large"
                  style={{ minWidth: 100, height: 40 }}
                >
                  {isLoading ? "در حال بررسی..." : "بعدی"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Flex>
  );
};

export default ForgetPasswordStep;
