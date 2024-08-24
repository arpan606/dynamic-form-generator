import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch, FormHelperText, Stack } from "@mui/material";

export function SwitchControlledField({ name, helperText, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack>
          <FormControlLabel
            label={label}
            control={<Switch {...field} checked={field.value} />}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
}
