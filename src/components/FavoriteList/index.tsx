import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistContainer from "containers/Playlist/Playlist";
import { UserContext } from "contexts";
import type { FC } from "react";
import React, { useContext } from "react";

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
const Playlist: FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <PlaylistContainer user={user} />
    </Container>
  );
};

export default Playlist;
