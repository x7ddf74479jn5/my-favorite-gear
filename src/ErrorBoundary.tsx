import { Button, Container, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import React from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import paths from "@/paths";

const FallbackComponent = ({ error }: FallbackProps) => {
  console.error(error);

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography align="center" gutterBottom variant="h4">
        Error
      </Typography>
      <Typography paragraph align="center" color="textSecondary">
        サイト上で問題が発生しました
      </Typography>
      <Button variant="contained" color="secondary" fullWidth href={paths.home}>
        ホームに戻る
      </Button>
    </Container>
  );
};

export const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ReactErrorBoundary>
  );
};
