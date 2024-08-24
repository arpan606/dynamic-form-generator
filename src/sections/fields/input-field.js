import { Stack } from "@mui/material";
import { Input } from "./input";
import { DeleteIcon } from "./delete-icon-field";
import { RequiredField } from "./requires-field";

export function InputField({ field, idx }) {
  return (
    <>
      <Stack alignItems="center" direction="row" bgcolor="#fff" gap={2}>
        <Input field={field} idx={idx} placeholder="Text Label" />
        <RequiredField field={field} idx={idx} />
        <DeleteIcon idx={idx} />
      </Stack>
    </>
  );
}
