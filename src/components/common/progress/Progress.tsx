import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import React from "react";

const Progress: FC = () => {
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
