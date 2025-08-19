 
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import {
  FormLabel,
} from "@mui/material";
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
};

function MyDatePicker({ className, name, labelText }: TextFieldProps) {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];
  const size = "small";
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <FormLabel
                sx={{
                  fontFamily: "Inter",
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: "4px",

                  color: error ? "#e91414" : "var(--primary-text)",
                }}
                htmlFor={name}
              >
                {labelText}
              </FormLabel>
              <DatePicker
                sx={{}}
                value={value === undefined ? value : dayjs(value)}
                inputRef={ref}
                slots={{}}
                slotProps={{
                  textField: {
                    fullWidth: true,

                    error: !!error,
                    helperText: error?.message?.toString(),
                    size,
                    sx: {
                      ".MuiPickersInputBase-root": {
                        backgroundColor: value
                          ? "var(--white)"
                          : "var(--hover)",
                      },
                      "& .Mui-focused.MuiPickersInputBase-root": {
                        backgroundColor: "var(--white) !important",
                      },
                      "& .Mui-error.MuiPickersInputBase-root": {
                        backgroundColor: "var(--white) !important",
                      },
                      ".MuiPickersSectionList-root.MuiPickersInputBase-sectionsContainer.MuiPickersOutlinedInput-sectionsContainer":
                        {
                          color: "var(--primary-text) !important",
                        },
                      "& .MuiPickersOutlinedInput-notchedOutline": {
                        transition: "border-color 0.2s ease-in-out",

                        borderColor: value
                          ? "var(--primary-text) !important"
                          : "transparent",
                      },
                      "&.Mui-error .MuiPickersOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff !important",
                      },
                      "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-text)",
                      },
                      ".MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-error .MuiPickersOutlinedInput-notchedOutline":
                        {
                          borderColor: "#e91414 !important",
                        },
                    },
                  },
                }}
                onChange={(value, context) => {
                  if (context.validationError === null && value) {
                    onChange(value.toDate());
                    trigger(name);
                  } else {
                    trigger(name);

                    onChange(undefined);
                  }
                }}
              />
            </LocalizationProvider>
          );
        }}
      />
    </div>
  );
}

export default MyDatePicker;
