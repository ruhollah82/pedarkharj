import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  className,
}) => {
  const defaultStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100",
    overflow: "hidden",
  };

  const combinedStyle: React.CSSProperties = { ...defaultStyle, ...style };

  return (
    <div style={combinedStyle} className={className}>
      {children}
    </div>
  );
};

export default Container;
