import React, { useEffect } from "react";

const ToggleButton = ({
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
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = React.useState<{
    left: number;
    width: number;
    height: number;
    top: number;
  }>({ left: 0, width: 0, height: 0, top: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const selectedBtn =
        containerRef.current.querySelectorAll("button")[selectedButtonIndex];

      if (selectedBtn) {
        const { offsetLeft, offsetWidth, offsetHeight, offsetTop } =
          selectedBtn;
        setSliderStyle({
          left: offsetLeft,
          width: offsetWidth,
          height: offsetHeight,
          top: offsetTop,
        });
      }
    }
  }, [selectedButtonIndex, buttons]);

  return (
    <div
      ref={containerRef}
      style={{gridTemplateColumns: `repeat(${buttons.length}, 1fr)`}}
      className={`bg-hover relative grid w-fit gap-2 rounded-lg ${className}`}
    >
     
      <div
        className="absolute top-0 h-full bg-blue-600 transition-all duration-300 ease-in-out rounded-lg"
        style={sliderStyle}
      ></div>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(index)}
          className={`z-99 flex-1 rounded-lg px-5  py-2 text-center transition-colors duration-300 hover:cursor-pointer ${
            selectedButtonIndex === index ? "text-white" : ""
          }`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;
