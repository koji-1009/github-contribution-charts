import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export function TopAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GitHub contributions chart</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
