import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";

import Footer from "./components/common/footer/Footer";
import NavigationBar from "./components/common/menubar/NavigationBar";
import MakePlaylist from "./components/MakePlaylist";
import Playlist from "./components/Playlist";
import Playlists from "./components/Playlists";
import Signin from "./components/Signin";
import { UserContext } from "./contexts";
import paths from "./paths";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
  };
});
const App: FC = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />
      <Switch>
        <Route path={paths.playlist} component={Playlist} exact />
        <Route path={paths.playlists} component={Playlists} exact />
        <Route
          path={paths.home}
          component={user ? MakePlaylist : Signin}
          exact
        />
        <Redirect to={paths.home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
