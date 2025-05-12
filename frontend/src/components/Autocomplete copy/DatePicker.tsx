import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import {  FormControlPropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

export interface Option {
  label: string;
  value: string;
}
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
  size?:
    | OverridableStringUnion<"small" | "medium", FormControlPropsSizeOverrides>
    | undefined;
};


function MyDatePicker({ name, labelText, size = "small" }: TextFieldProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const errorField = errors?.[name];

  const [error, setError] = React.useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, value } }) => {
        return (
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              value={value === undefined ? value : dayjs(value)}
              inputRef={ref}
              label={labelText}
              className="!text-[15px] h-full w-full"
              slotProps={{
                textField: {
                  error: !!errorField || error,
                  helperText: errorField?.message?.toString(),
                  size,
                  InputProps: {
                    sx: { fontSize: "15px", backgroundColor: "white" },
                  },
                  InputLabelProps: { sx: { fontSize: "15px" } },
                },
              }}
              onChange={(value, context) => {
                if (context.validationError === null && value) {
                  //console.log("value: ", value);
                  //console.log("context: ", context);
                  setError(false);
                  onChange(value.toDate());
                  trigger(name);
                } else {
                  onChange(undefined);
                  setError(true);
                  // console.log("value else: ", value);
                  // console.log("context else: ", context);
                }
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}

export default MyDatePicker;
