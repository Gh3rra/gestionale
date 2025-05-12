import {
  FormControl,
  FormControlPropsSizeOverrides,
  FormHelperText,
  InputAdornment,
  
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { checkValueDecimal, checkValueNumber } from "../../common/utils";

type Datatype = "number" | "decimal" | "text";

type TextFieldProps = {
  name: string;
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
  size?:
    | OverridableStringUnion<"small" | "medium", FormControlPropsSizeOverrides>
    | undefined;
  datatype?: Datatype;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

function MyTextField({
  disabled,
  name,
  labelText,
  className,
  onChange,
  currency,
  height,
  width,
  type,
  datatype = "text",
  readOnly,
  size = "small",
}: TextFieldProps) {
  const cane = useFormContext();

  const {
    watch,
    register,
    getFieldState,
    formState: { errors },
  } = cane;
  const { error } = getFieldState(name);
  const fieldRegister = register(name);
  const current = watch(name);
  const [focused, setFocused] = useState<boolean>(false);

  return fieldRegister ? (
    <FormControl
      className={className}
      style={{ width, height }}
      fullWidth
      error={!!error}
      size={size}
    >
      <InputLabel className="!text-[15px]" htmlFor={fieldRegister.name}>
        {labelText}
      </InputLabel>

      <OutlinedInput
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        fullWidth
        className="!text-[15px] bg-white"
        id={fieldRegister.name}
        label={labelText}
        error={!!error}
        onFocus={() => {
          setFocused(true);
        }}
        {...fieldRegister}
        onBlur={(e) => {
          setFocused(false);

          console.log(errors);
          console.log(error);

          fieldRegister.onBlur(e);
        }}
        startAdornment={
          currency &&
          (focused || current) && (
            <InputAdornment
              sx={{
                pointerEvents: "none",
              }}
              position="start"
            >
              {currency}
            </InputAdornment>
          )
        }
        onChange={(e) => {
          switch (datatype) {
            case "text":
              break;
            case "number":
              e.target.value = checkValueNumber(e.target.value);

              break;
            case "decimal":
              e.target.value = checkValueDecimal(e.target.value);
              break;

            default:
              break;
          }
          if (onChange) {
            onChange(e);
          }
          fieldRegister.onChange(e);
        }}
      />
      {!!error && <FormHelperText>{error.message?.toString()}</FormHelperText>}
    </FormControl>
  ) : (
    <FormControl fullWidth style={{ width: width, height: height }} size={size}>
      <InputLabel htmlFor="component-outlined">{labelText}</InputLabel>

      <OutlinedInput id="component-outlined" label={labelText} />
    </FormControl>
  );
}

export default MyTextField;
