import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React, { useContext } from "react";

import FavoriteListContainer from "@/containers/FavoriteList/FavoriteList";
import { UserContext } from "@/contexts";

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
const FavoriteList: FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <FavoriteListContainer user={user} />
    </Container>
  );
};

export default FavoriteList;
