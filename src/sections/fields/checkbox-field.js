import { Checkbox, Stack } from "@mui/material";
import { Input } from "./input";
import { DeleteIcon } from "./delete-icon-field";

export function CheckBoxField({ field, idx }) {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Checkbox defaultChecked size="small" />
      <Input field={field} idx={idx} placeholder="Check Box Label" />
      <DeleteIcon idx={idx} />
    </Stack>
  );
}
