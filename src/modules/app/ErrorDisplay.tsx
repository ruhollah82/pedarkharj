// src/components/ErrorDisplay/ErrorDisplay.tsx
import React from "react";
import { Result, Button, Typography, Space } from "antd";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/Images/No Connection.json";

const { Text, Title } = Typography;

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "24px",
        textAlign: "center",
        background: "#fff",
      }}
    >
      <Lottie
        animationData={errorAnimation}
        loop={true}
        style={{ maxWidth: 300, marginBottom: 24 }}
      />

      <Result
        status="error"
        title="خطا در دریافت اطلاعات"
        subTitle="متاسفانه مشکلی در ارتباط با سرور پیش آمده است"
        extra={
          <Space direction="vertical" size="large">
            <Text
              type="danger"
              style={{
                background: "rgba(255, 77, 79, 0.1)",
                padding: "12px 24px",
                borderRadius: "8px",
                maxWidth: "600px",
                display: "inline-block",
              }}
            >
              {error}
            </Text>

            {onRetry && (
              <Button
                type="primary"
                size="large"
                onClick={onRetry}
                style={{ marginTop: 16 }}
              >
                تلاش مجدد
              </Button>
            )}
          </Space>
        }
      />
    </div>
  );
};

export default ErrorDisplay;
