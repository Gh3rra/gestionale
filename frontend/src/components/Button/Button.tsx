import React from "react";
import styles from "./Button.module.css";

const buttonClass = {
  black: styles.blackButton,
  white: styles.whiteButton,
};

type ButtonProps = {
  active?: boolean;
  width?: string;
  height?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  buttonColor?: "white" | "black";
  className? : string;
};

const Button = ({
  active,
  width,
  height,
  children,
  style,
  onClick,
  className,
  buttonColor = "white",
}: ButtonProps) => {
  return (
    <div className={styles.wrapper}>
      <button
      type="button"
        style={{ width: width, height: height, ...style }}
        onClick={onClick}
        className={`${styles.button} ${active ? styles.active : ""} 
          ${buttonClass[buttonColor]} ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
