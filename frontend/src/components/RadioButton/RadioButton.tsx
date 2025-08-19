import React from "react";

const RadioButton = ({
  buttons,
  selectedButtonIndex = 0,
  onButtonClick,
  className,
}: {
  buttons: string[];
  selectedButtonIndex: number;
  onButtonClick: (index: number) => void;
  className?: string;
}) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${buttons.length}, 1fr)` }}
      className={`grid w-fit gap-2 ${className}`}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          
          onClick={(e) => {
            e.preventDefault();
            onButtonClick(index)}}
          className={`border-fourtiary flex-1 rounded-md px-5 py-2 text-center transition-all duration-50 hover:cursor-pointer active:scale-95 ${
            selectedButtonIndex === index
              ? "border-primary-text border-1"
              : "border-[0.5px]"
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default RadioButton;
