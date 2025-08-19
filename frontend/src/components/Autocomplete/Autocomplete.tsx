import {
  Autocomplete,
  FormControl,
  FormControlPropsSizeOverrides,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  options: Option[];
  type?: React.HTMLInputTypeAttribute | undefined;
  style?: React.CSSProperties;
  className?: string;
  size?:
    | OverridableStringUnion<"small" | "medium", FormControlPropsSizeOverrides>
    | undefined;
  onChange?: () => void;
};

function MyAutocomplete({
  name,
  labelText,
  className,
  width,
  options = [],
}: TextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => {
        return (
          <FormControl className={className} error={!!error} fullWidth>
            <FormLabel
              sx={{
                display: "block",
                color: "var(--primary-text)",
                fontSize: "0.875rem",
                fontWeight: 500,
                lineHeight: 1.5,
                marginBottom: "4px",
                "&.Mui-focused": {
                  color: "var(--primary-text)",
                },
                "&.Mui-error": {
                  color: "#e91414",
                },
              }}
              htmlFor={name}
            >
              {labelText}
            </FormLabel>
            <Autocomplete
              
              autoHighlight
              forcePopupIcon={false}
              options={options}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  transition: "border-color 0.2s ease-in-out",
                  borderColor: field.value
                    ? "var(--primary-text)"
                    : "transparent",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary-text)",
                },

                "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e91414 !important",
                },
                " .MuiInputBase-sizeSmall": {
                  backgroundColor: field.value ? "transparent" : "var(--hover)",
                },
                "&.Mui-focused .MuiInputBase-sizeSmall": {
                  backgroundColor: "var(--white)",
                },
                "& .Mui-error.MuiInputBase-sizeSmall": {
                  backgroundColor: "var(--white) !important",
                },

                /*   "& .Mui-error .MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall":
                  {
                    backgroundColor: "var(--white) !important",
                    borderColor: "#e91414 !important",
                  }, */
                /* "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                  backgroundColor: "var(--white) !important",
                  borderColor: "#e91414 !important",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  backgroundColor: field.value
                    ? "transparent"
                    : "var(--hover)",
                  borderColor: field.value
                    ? "var(--primary-text)"
                    : "transparent",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary-text)",
                  backgroundColor: "transparent",
                }, */
              }}
              {...field}
              onChange={(_, value) => {
                onChange(typeof value === "string" ? value : value?.value);
              }}
              renderInput={(params) => {
                return <TextField {...params} error={!!error} size="small" />;
              }}
            />
            {error && (
              <FormHelperText className="!text-red-500">
                {error.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl fullWidth style={{ width: width }}>
      <InputLabel htmlFor="component-outlined">{labelText}</InputLabel>

      <OutlinedInput id="component-outlined" label={labelText} />
    </FormControl>
  );
}

export default MyAutocomplete;
