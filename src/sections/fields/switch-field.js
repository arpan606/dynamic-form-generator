import { Stack, Switch } from "@mui/material";
import "./common-field.css";
import { Input } from "./input";
import { DeleteIcon } from "./delete-icon-field";

export function SwitchField({ field, idx }) {
  return (
    <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
      <Switch defaultChecked size="small" />
      <Input field={field} idx={idx} placeholder="Radio Button Label" />
      <DeleteIcon idx={idx} />
    </Stack>
  );
}
