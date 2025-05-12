import React from "react";
import styles from "./Icon.module.css";

const Icon = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick} className={styles.container}>
      {children}
    </div>
  );
};

export default Icon;
