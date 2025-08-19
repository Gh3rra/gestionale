import React from "react";

const IconButton = ({
  children,
  onClick,
  className,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={
        "hover:bg-second-background flex items-center justify-center rounded-2xl p-2 transition-colors duration-300 hover:cursor-pointer " +
        className
      }
    >
      {children}
    </div>
  );
};

export default IconButton;
