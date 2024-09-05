import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => {
  const defaultStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  };

  const combinedStyle: React.CSSProperties = { ...defaultStyle, ...style };

  return (
    <div className={className} style={combinedStyle}>
      {children}
    </div>
  );
};

export default Container;
