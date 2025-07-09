import React from "react";
import { Row, Col, Typography, Space } from "antd";

const { Title, Text } = Typography;

interface WalletBalanceProps {
  balance: number;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <Space
      style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}
    >
      <Row gutter={[16, 0]} align="middle">
        <Col>
          <Title
            level={1}
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "4rem",
              fontWeight: 700,
              textShadow: `
                0 2px 4px rgba(0, 0, 0, 0.2),
                0 4px 12px rgba(255, 255, 255, 0.1)
              `,
              position: "relative",
              background: "linear-gradient(180deg, #fff 0%, #FFEBA9 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              // textFillColor: "transparent",
            }}
          >
            +{balance.toLocaleString("en-US")}
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "10%",
                right: "10%",
                height: "3px",
                background: "rgba(255, 255, 255, 0.4)",
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(255, 230, 156, 0.3)",
              }}
            />
          </Title>
        </Col>
        <Col>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "1.5rem",
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              marginLeft: "8px",
              padding: "4px 12px",
              // background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              backdropFilter: "blur(4px)",
            }}
          >
            تومان
          </Text>
        </Col>
      </Row>
    </Space>
  );
};

export default WalletBalance;
