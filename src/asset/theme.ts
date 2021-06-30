import type { Theme } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

const theme: Theme = createMuiTheme({
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
