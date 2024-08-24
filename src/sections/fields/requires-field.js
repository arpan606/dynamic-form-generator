import { Stack, Switch, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import "./common-field.css";
import { updateField } from "../../redux/actions/form";

export function RequiredField({ idx, field }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      updateField({
        ...field,
        idx: idx,
        validations: {
          ...field?.validations,
          required: event?.target?.checked || false,
        },
      })
    );
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      borderRight="1px solid rgb(224 224 224)"
      p={1}
      gap={0.5}
    >
      <Switch size="small" onChange={handleChange} />
      <Typography>Required</Typography>
    </Stack>
  );
}
