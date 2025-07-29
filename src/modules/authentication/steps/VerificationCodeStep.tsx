import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Form, Typography, Row, Col, Alert, Flex } from "antd";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/Verify Phone Number.json";
import styles from "../SignUp.module.css";
import useCountdown from "../../../hooks/useCountdown";
import useAuthFlow from "../../../hooks/useAuthFlow";
import useAuth from "../../../hooks/useAuth";

const { Text, Title } = Typography;

const VerificationCodeStep = () => {
  const SECONDS = 15; // Countdown duration
  const [triggerCountdown, setTriggerCountdown] = useState(0);
  const countDown = useCountdown(SECONDS, triggerCountdown);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const hasSentRef = useRef(false);

  const {
    phoneNumber,
    prevStep,
    tempToken,
    setTempToken,
    clearCodeError,
    errors,
    nextStep,
    setCodeError,
  } = useAuthFlow();

  const { verifyOtp, sendOtp } = useAuth();

  useEffect(() => {
    if (!hasSentRef.current) {
      hasSentRef.current = true;
      sendVerificationCode();
    }
  }, []);

  const sendVerificationCode = async () => {
    try {
      clearCodeError();
      const response = await sendOtp(phoneNumber).unwrap();
      console.log(response);
      if (response.token !== undefined) {
        setTempToken(response.token);
      }
      console.log("token:", response.token);
      setTriggerCountdown((prev) => prev + 1);
    } catch (err) {
      setCodeError("خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleResendCode = () => {
    sendVerificationCode();
  };

  const handleSubmit = async (values: { verificationCode: string }) => {
    try {
      setIsLoading(true);
      clearCodeError();

      const verResponse = await verifyOtp({
        number: phoneNumber,
        otp: parseInt(values.verificationCode, 10),
        token: tempToken,
        mode: "signup",
      }).unwrap();
      console.log(verResponse);

      if (verResponse.nextStep === "go_signup") {
        setTempToken(verResponse.token);
        nextStep();
      } else if (verResponse.nextStep === "invalid_field") {
        setCodeError("کد تایید یا شماره تلفن نا معتبر است.");
      } else if (verResponse.nextStep === "wrong_otp") {
        setCodeError("کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید.");
      } else {
        setCodeError("خطای نامشخص!");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "کد تأیید نامعتبر است. لطفاً دوباره تلاش کنید.";
      setCodeError(errorMessage);
      form.setFields([
        {
          name: "verificationCode",
          errors: [errorMessage],
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
      <div style={{ textAlign: "center" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          کد تأیید را وارد کنید
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          اممم... به نظر میرسه قبلا ثبت نام نکردی! ما به شماره تلفنت یک کد تایید
          ارسال کردیم.
        </Text>

        <Lottie
          animationData={verificationAnim}
          loop={false}
          style={{ maxWidth: 300, margin: "0 auto 24px" }}
        />

        {errors.codeError && (
          <Alert
            message={errors.codeError}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
            onClose={() => clearCodeError()}
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
            <Input.OTP length={5} autoFocus />
          </Form.Item>

          <Form.Item>
            <Row gutter={16} justify="center">
              <Col>
                <Button
                  type="default"
                  onClick={prevStep}
                  size="large"
                  style={{ minWidth: 100 }}
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
                  style={{ minWidth: 100 }}
                >
                  {isLoading ? "در حال بررسی..." : "بعدی"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 24 }}>
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
        </div>
      </div>
    </Flex>
  );
};

export default VerificationCodeStep;
