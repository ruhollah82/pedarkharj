import React from "react";
import { Button, Input, Typography, Row, Col, Form, Alert } from "antd";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";
import useCountdown from "../../../hooks/useCountdown";

const { Text, Title } = Typography;

interface ForgetPasswordStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  error: string | undefined;
  seconds: number;
  sendVerificationCode: () => void;
}

const ForgetPasswordStep: React.FC<ForgetPasswordStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleNext,
  handleBack,
  error,
  seconds,
  sendVerificationCode,
}) => {
  const [triggerCountdown, setTriggerCountdown] = React.useState(0);
  const countDown = useCountdown(seconds, triggerCountdown);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResendCode = () => {
    sendVerificationCode();
    setTriggerCountdown((prev) => prev + 1);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);
        handleNext();
      })
      .catch(() => {
        // Validation errors will be shown automatically
      })
      .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && verificationCode) {
      handleSubmit();
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      className={styles.center}
      style={{ minHeight: "100vh", padding: 16 }}
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
          />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          initialValues={{ verificationCode }}
        >
          <Form.Item
            name="verificationCode"
            rules={[
              { required: true, message: "لطفاً کد تأیید را وارد کنید" },
              {
                pattern: /^\d{5,6}$/,
                message: "کد تأیید باید ۵ یا ۶ رقم باشد",
              },
            ]}
          >
            <Input.OTP
              length={6}
              onChange={setVerificationCode}
              onKeyDown={handleKeyDown}
              value={verificationCode}
              // inputType="numeric"
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
                  onClick={handleBack}
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
                  disabled={!verificationCode}
                  style={{ minWidth: 100, height: 40 }}
                >
                  {isLoading ? "در حال بررسی..." : "بعدی"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ForgetPasswordStep;
