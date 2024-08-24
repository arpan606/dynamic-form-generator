import React from "react";
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  Switch,
  FormHelperText,
  Stack,
  Autocomplete,
  CardHeader,
} from "@mui/material";
import "./preview-form.css";
// ----------------------------------------------------------------------

const buildValidationSchema = (config) => {
  const shape = {};

  config.forEach((field, index) => {
    const name = String(field.idx || index);
    if (field.type === "text_input" || field.type === "text_area") {
      let schema = yup.string();

      if (field.validations.required) {
        schema = schema.required();
      }

      if (field.validations.min) {
        schema = schema.min(field.validations.min);
      }

      if (field.validations.max) {
        schema = schema.max(field.validations.max);
      }

      shape[name] = schema.label(field.label);
    } else if (field.type === "checkbox") {
      shape[name] = yup.boolean();
    } else if (field.type === "dropdown" || field.type === "radio") {
      shape[name] = yup.string().required("This field is required");
    }
  });

  return yup.object().shape(shape);
};
// ----------------------------------------------------------------------

export default function DynamicForm({ formConfig }) {
  const validationSchema = buildValidationSchema(formConfig);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {};

  return (
    <Card
      sx={{
        width: "100%",
        height: "95%",
        overflow: "hidden",
        margin: "0 auto",
        minHeight: "650px",
        pb: 1,
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} class="preview-form-area">
          <CardHeader title={"Preview Form"} />
          <Stack gap={2}>
            {formConfig.map((field, index) => {
              const name = String(field.idx || index);
              switch (field.type) {
                case "text_input":
                case "text_area":
                  return (
                    <TextfieldControlledField
                      name={name}
                      label={field?.label}
                    />
                  );
                case "dropdown":
                  return (
                    <AutocompleteControlledField
                      name={name}
                      label={field.label}
                      place="Choose Option"
                      options={field.options}
                    />
                  );
                case "checkbox":
                  return (
                    <CheckboxControlledField name={name} label={field.label} />
                  );
                case "switch":
                  return (
                    <SwitchControlledField name={name} label={field.label} />
                  );
                default:
                  return null;
              }
            })}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
}

// ----------------------------------------------------------------------

function SwitchControlledField({ name, helperText, label }) {
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

// ----------------------------------------------------------------------

function TextfieldControlledField({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error ? error.message : ""}
          label={label}
        />
      )}
    />
  );
}

// ----------------------------------------------------------------------

function AutocompleteControlledField({
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

// ----------------------------------------------------------------------

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
