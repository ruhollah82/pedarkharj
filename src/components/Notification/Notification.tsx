import React, { useState } from "react";
import { Avatar, Typography, Space, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Expense from "../../types/interfaces/expense";
import { Icon } from "@iconify/react";

const { Text, Paragraph } = Typography;

interface NotificationProps {
  expense: Expense;
}

const Notification: React.FC<NotificationProps> = ({ expense }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Row
      style={{
        direction: "rtl",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "1.5rem",
        boxShadow: "1px 5px 20px rgba(32, 32, 32, 0.3)",
        margin: "5px 0 25px",
        padding: "1rem",
        transition: "all 0.3s ease-in-out",
        // transform: isHovered ? "scale(1.02)" : "scale(1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <Col span={24}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {/* Header Section */}
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="middle" align="center">
                <Avatar
                  src={expense.picture}
                  size={64}
                  style={{
                    border: "2px solid #0277BD",
                    boxShadow: "0 2px 8px rgba(2, 119, 189, 0.2)",
                    transition: "transform 0.3s ease",
                  }}
                />
                <Space direction="vertical" size={2}>
                  <Text strong style={{ fontSize: 18, color: "#0277BD" }}>
                    {expense.title}
                  </Text>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 14,
                      maxHeight: expanded ? "0" : "1.5em",
                      opacity: expanded ? 0 : 1,
                      overflow: "hidden",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {`${expense.title} یک دنگ...`}
                  </Text>
                </Space>
              </Space>
            </Col>

            <Col>
              <Space direction="vertical" align="end">
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {expense.date}
                </Text>
                <Text
                  strong
                  style={{
                    fontSize: 18,
                    color: "#52c41a",
                    direction: "ltr",
                    background: "linear-gradient(45deg, #52c41a, #a0d911)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: expanded ? 0 : 1,
                    maxHeight: expanded ? "0" : "1.5em",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  +{expense.amount.toLocaleString()}
                </Text>
              </Space>
            </Col>
          </Row>

          {/* Animated Expand Content */}
          <div
            style={{
              maxHeight: expanded ? "500px" : "0",
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              paddingTop: expanded ? "1rem" : "0",
              borderTop: expanded
                ? "1px dashed rgba(2, 119, 189, 0.2)"
                : "transparent",
              marginTop: expanded ? "1rem" : "0",
            }}
          >
            <Paragraph
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(0, 0, 0, 0.85)",
                transform: `translateY(${expanded ? "0" : "-10px"})`,
                transition: "transform 0.3s ease",
                transitionDelay: "0.1s",
              }}
            >
              {expense.description}
            </Paragraph>

            <Link to="/app/search">
              <Button
                type="primary"
                ghost
                style={{
                  borderColor: "#0277BD",
                  color: "#0277BD",
                  float: "left",
                  marginTop: "1rem",
                  transform: `scale(${expanded ? "1" : "0.95"})`,
                  transition: "transform 0.3s ease",
                }}
              >
                جزئیات
              </Button>
            </Link>
          </div>

          {/* Animated Expand Icon */}
          <div
            style={{
              textAlign: "center",
              marginTop: "0.5rem",
              transform: `rotate(${expanded ? "180deg" : "0deg"})`,
              transition:
                "transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            }}
          >
            <Icon
              icon="solar:alt-arrow-down-linear"
              width={24}
              height={24}
              style={{
                color: "rgba(2, 119, 189, 0.5)",
              }}
            />
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default Notification;
