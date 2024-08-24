import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Stack, CardHeader, Typography } from "@mui/material";
import "./preview-form.css";
import { SwitchControlledField } from "./switch-controlled-field";
import { AutocompleteControlledField } from "./autocomplete-controlled-field";
import { CheckboxControlledField } from "./checkbox-controlled-field";
import { TextfieldControlledField } from "./textfield-controlled-field";

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

  const [isValidForm, setIsValidForm] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setIsValidForm(true);
  };

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
          {!isValidForm ? (
            <>
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
                        <CheckboxControlledField
                          name={name}
                          label={field.label}
                        />
                      );
                    case "switch":
                      return (
                        <SwitchControlledField
                          name={name}
                          label={field.label}
                        />
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
            </>
          ) : (
            <Typography>!!! Successfull submission !!!! </Typography>
          )}
        </form>
      </FormProvider>
    </Card>
  );
}
