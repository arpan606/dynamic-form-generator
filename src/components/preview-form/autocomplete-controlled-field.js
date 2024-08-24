import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import "./preview-form.css";

export function AutocompleteControlledField({
  name,
  label,
  placeholder,
  options = [],
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : ""}
              placeholder={placeholder}
              {...params}
            />
          )}
          options={options}
          getOptionLabel={(option) => (option ? option : "")}
          onChange={(event, newValue) => setValue(name, newValue)}
          isOptionEqualToValue={(option, value) => option === value}
        />
      )}
    />
  );
}
