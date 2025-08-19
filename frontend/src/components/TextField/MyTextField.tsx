import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  checkValueCap,
  checkValueDecimal,
  checkValueNumber,
} from "../../common/utils";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

type Datatype = "number" | "decimal" | "text" | "cap";

type TextFieldProps = {
  icon?: React.ReactNode;
  name?: string;
  labelText?: string;
  placeHolder?: string;
  height?: string;
  width?: string;
  currency?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  style?: React.CSSProperties;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
  datatype?: Datatype;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

function MyTextField({
  icon,
  labelText,
  className,
  value,
  onChange,
  name,
  disabled = false,
  datatype = "text",
  type,
}: TextFieldProps) {
  return (
    <div className={className}>
      <FormControl fullWidth>
        {labelText && (
          <FormLabel
            sx={{
              fontFamily: "Inter",
              color: "var(--primary-text)",
              fontSize: "0.875rem",
              fontWeight: 500,
              display: "block",
              marginBottom: "4px",
              "&.Mui-focused": {
                color: "var(--primary-text)",
              },
            }}
          >
            {labelText}
          </FormLabel>
        )}
        <OutlinedInput
          type={type}
          fullWidth
          size="small"
          startAdornment={
            icon && <InputAdornment position="start"> {icon}</InputAdornment>
          }
          sx={{
            fontFamily: "Inter",
            backgroundColor: value ? "var(--white)" : "var(--hover)",
            "&.Mui-focused ": {
              backgroundColor: "var(--white)",
            },
            "&.Mui-error": {
              backgroundColor: "var(--white)",
            },

            ".MuiOutlinedInput-notchedOutline": {
              transition: "border-color  0.2s ease-in-out",
              borderColor: value ? "var(--primary-text)" : "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-text)",
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e91414",
            },
            "&.Mui-active ": {
              backgroundColor: "var(--primary-text)",
            },
          }}
          onChange={(e) => {
            if (datatype === "number") {
              e.target.value = checkValueNumber(e.target.value);
            } else if (datatype === "decimal") {
              e.target.value = checkValueDecimal(e.target.value);
            } else if (datatype === "cap") {
              e.target.value = checkValueCap(e.target.value);
            }
            if (onChange) {
              onChange(e);
            }
          }}
        />
      </FormControl>
    </div>
  );
}

export default MyTextField;
