import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React from "react";

import FavoriteListsContainer from "@/containers/FavoriteLists/FavoriteLists";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
  };
});
const FavoriteLists: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <FavoriteListsContainer />
    </Container>
  );
};

export default FavoriteLists;
