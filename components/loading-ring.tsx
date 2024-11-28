"use client";

import React from "react";

interface LoadingRingProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const LoadingRing: React.FC<LoadingRingProps> = ({
  size = "md",
  color = "#3498db",
  className = "",
}) => {
  const sizeStyles = {
    sm: { width: 24, height: 24, borderWidth: 2 },
    md: { width: 40, height: 40, borderWidth: 4 },
    lg: { width: 64, height: 64, borderWidth: 6 },
  };

  return (
    <div
      className={`inline-block rounded-full animate-spin ${className}`}
      style={{
        ...sizeStyles[size],
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderTopColor: color,
        borderStyle: "solid",
      }}
    />
  );
};

export default LoadingRing;
