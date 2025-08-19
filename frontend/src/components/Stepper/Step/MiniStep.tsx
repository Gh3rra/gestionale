import React from "react";
import styles from "./MiniStep.module.css";

function MiniStep({
  text,
  isActive,
  state,
}: {
  text: string;
  isActive: boolean;
  state: number;
}) {
  if (isActive) {
    return (
      <div className={styles.miniStep}>
        <div className={styles.wrapper}>
          <div className={styles.line}></div>
          <div className={`${styles.text} ${state === 1 && styles.editText}`}>
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default MiniStep;
