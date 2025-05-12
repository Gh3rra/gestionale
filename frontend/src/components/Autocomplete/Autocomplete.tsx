import {
  Autocomplete,
  FormControl,
  FormControlPropsSizeOverrides,
  FormHelperText,
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
  size = "small",
}: TextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name];

  return control ? (
    <FormControl style={{ width }} error={!!error} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange } = field;
          return (
            <Autocomplete
              autoSelect
              forcePopupIcon={false}
              options={options}
              {...field}
              onChange={(_, value) => {
                onChange(typeof value === "string" ? value : value?.value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  label={labelText}
                  size={size}
                  slotProps={{
                    inputLabel: { sx: { fontSize: "15px" } },
                  }}
                  error={!!error}
                  className="!text-[15px] bg-white h-full w-full"
                />
              )}
            />
          );
        }}
      />
      {!!error && <FormHelperText>{error.message?.toString()}</FormHelperText>}
    </FormControl>
  ) : (
    <FormControl fullWidth style={{ width: width }}>
      <InputLabel htmlFor="component-outlined">{labelText}</InputLabel>

      <OutlinedInput id="component-outlined" label={labelText} />
    </FormControl>
  );
}

export default MyAutocomplete;
