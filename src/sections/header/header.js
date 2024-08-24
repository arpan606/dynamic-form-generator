import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar sx={{ bgcolor: "#f1f5f9" }}>
      <Toolbar>
        <Typography variant="h6" color="black">FORM BUILDER</Typography>
      </Toolbar>
    </AppBar>
  );
}
