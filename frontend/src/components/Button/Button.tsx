import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const MyButton = ({
  children,
  onClick,
  className,
  variant = "primary",
}: ButtonProps) => {
  const baseClass =
    "rounded-lg px-5 py-2 hover:cursor-pointer transition-colors duration-300";
  const variantClasses = {
    primary:
      "bg-transparent border-1 border-black hover:bg-black text-primary-text hover:text-white",
    secondary: "bg-secondary hover:bg-secondary-text text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default MyButton;
