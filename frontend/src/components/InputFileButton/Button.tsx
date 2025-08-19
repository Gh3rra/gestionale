import { Button } from "@mui/material";
import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const MyButtonFile = ({
  children,
  className,
  accept,
  onChange,
  disabled = false,
}: ButtonProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        className={"hover:cursor-pointer" + className}
      >
        {children}
      </Button>
      <input
      disabled={disabled}
        type="file"
        onChange={onChange}
        ref={inputRef}
        accept={accept}
        className="hidden"
      />
    </>
  );
};

export default MyButtonFile;
