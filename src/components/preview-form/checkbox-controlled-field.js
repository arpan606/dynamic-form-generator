import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import "./preview-form.css";

export function CheckboxControlledField({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Stack>
            <FormControlLabel
              label={label}
              control={<Checkbox {...field} checked={field.value} />}
            />
          </Stack>
        </div>
      )}
    />
  );
}
