import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import type { FC } from "react";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    styledContainer: {
      textAlign: "center",
      margin: theme.spacing(4, 0),
    },
  };
});
const Progress: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.styledContainer}>
      <Typography>読み込み中</Typography>
      <CircularProgress size={50} />
    </Container>
  );
};

export default Progress;
