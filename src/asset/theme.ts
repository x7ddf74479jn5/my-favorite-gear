import { red } from "@mui/material/colors";
import type { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme: Theme = createTheme({
  palette: {
    primary: { main: "#212121" },
    secondary: red,
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
