import { Stack } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Input } from "./input";
import { DeleteIcon } from "./delete-icon-field";
import { RequiredField } from "./requires-field";

export function TextArea({ field, idx }) {
  return (
    <Stack gap={2}>
      <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
        <Input field={field} idx={idx} placeholder="Text Area Label" />
        <RequiredField field={field} idx={idx} />
        <DeleteIcon idx={idx} />
      </Stack>
      <Textarea placeholder="Text Area" disabled minRows={4} />
    </Stack>
  );
}
