import React from "react";
import { Progress } from "antd";

interface ProgresBarProps {
  active: boolean;
}

const ProgresBar: React.FC<ProgresBarProps> = ({ active }) => {
  if (!active) return null;

  return (
    <Progress
      percent={100}
      status="active"
      showInfo={false}
      strokeColor="#1890ff"
      strokeWidth={4}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        lineHeight: 0,
        zIndex: 1000,
      }}
    />
  );
};

export default ProgresBar;
