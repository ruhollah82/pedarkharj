import React, { useState } from "react";
import { Button, Input, Form, Typography, Row, Col, Alert } from "antd";
import Lottie from "lottie-react";
import verificationAnim from "../../../assets/Images/verification.json";
import styles from "../SignUp.module.css";

const { Text, Title } = Typography;

interface VerificationCodeStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  error: string | undefined;
  resendCodeTimer?: number;
  onResendCode?: () => void;
}

const VerificationCodeStep: React.FC<VerificationCodeStepProps> = ({
  verificationCode,
  setVerificationCode,
  handleNext,
  handleBack,
  error,
  resendCodeTimer = 0,
  onResendCode,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className={styles.center} style={{ textAlign: "center" }}>
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

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
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
            onChange={(value) => setVerificationCode(value)}
            onKeyDown={handleKeyDown}
            value={verificationCode}
            // inputType="numeric"
            formatter={(str) => str.toUpperCase()}
            autoFocus
          />
        </Form.Item>

        <Form.Item>
          <Row gutter={16} justify="center">
            <Col>
              <Button
                type="default"
                onClick={handleBack}
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
                disabled={!verificationCode}
              >
                بعدی
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      {onResendCode && (
        <div style={{ marginTop: 24 }}>
          <Button
            type="link"
            onClick={onResendCode}
            disabled={resendCodeTimer > 0}
          >
            {resendCodeTimer > 0
              ? `ارسال مجدد کد (${resendCodeTimer} ثانیه)`
              : "ارسال مجدد کد تأیید"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationCodeStep;
