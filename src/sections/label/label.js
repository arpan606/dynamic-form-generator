import { Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

export default function Label({ name, icon, onClick }) {
  return (
    <Stack
      gap={1}
      width="120px"
      border="1px solid #cece"
      direction="row"
      p={1}
      alignItems="center"
      borderRadius="4px"
      bgcolor={"#f1f5f940"}
      sx={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Icon icon={icon} />
      <Typography>{name}</Typography>
    </Stack>
  );
}
