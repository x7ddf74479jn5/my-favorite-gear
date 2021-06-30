import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import MakePlaylistContainer from "containers/MakePlaylist/MakePlaylist";
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
const MakePlaylist: FC = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  if (user === null) return null;
  return (
    <Container maxWidth="xs" className={classes.root}>
      {user && <MakePlaylistContainer user={user} />}
    </Container>
  );
};

export default MakePlaylist;
