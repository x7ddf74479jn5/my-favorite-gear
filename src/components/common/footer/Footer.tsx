import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import type { FC } from "react";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      padding: theme.spacing(2),
      marginTop: "auto",
    },
  };
});
const Footer: FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="body1" color="textSecondary" align="center">
        {"俺のオタクソング8選"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"©2020  "}
        <Link color="inherit" href="https://twitter.com/ptrst102">
          {"@ptrst102"}
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
