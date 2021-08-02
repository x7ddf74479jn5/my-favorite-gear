import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistsContainer from "containers/Playlists/Playlists";
import type { FC } from "react";
import React from "react";

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
const Playlists: FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <PlaylistsContainer />
    </Container>
  );
};

export default Playlists;
