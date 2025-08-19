import React from "react";
import styles from "./Step.module.css";

type StepProps = {
  children?: React.ReactNode;
  text: string;
  icon: React.ReactNode;
  state: number;
  gap?: string;
  onClick?: () => void;
};

function Step({ children, text, icon, state, gap, onClick }: StepProps) {
  const getStyle = () => {
    switch (state) {
      case 0:
        return styles.start;

      case 1:
        return styles.editing;

      case 2:
        return styles.done;
    }
  };

  return (
    <div className={styles.step} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={`${styles.circleState} ${getStyle()}`}>
          <div
            className={styles.lineConnector}
            style={state === 2 ? { height: `${gap}`, bottom: `-${gap}` } : {}}
          ></div>
          {icon}
        </div>
        <div className={`${styles.text} ${state === 1 && styles.editText}`}>
          {text}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Step;
