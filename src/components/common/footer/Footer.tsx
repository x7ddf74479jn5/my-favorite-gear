import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React from "react";

const Container = styled("footer")(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: "auto",
}));

const Footer: VFC = () => {
  return (
    <Container>
      <Typography variant="body1" color="textSecondary" align="center">
        {"My Favorite Gear"}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"©2021  "}
        <Link color="inherit" href="https://twitter.com/pandashark6">
          {"@pandashark6"}
        </Link>
      </Typography>
    </Container>
  );
};

export default Footer;
