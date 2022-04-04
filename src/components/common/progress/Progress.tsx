import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { VFC } from "react";
import React from "react";

const Progress: VFC = () => {
  return (
    <Container
      sx={{ textAlign: "center", margin: (theme) => theme.spacing(4, 0) }}
    >
      <Typography>読み込み中</Typography>
      <CircularProgress size={50} />
    </Container>
  );
};

export default Progress;
