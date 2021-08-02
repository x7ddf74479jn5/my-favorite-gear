import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";

import Footer from "./components/common/footer/Footer";
import NavigationBar from "./components/common/menubar/NavigationBar";
import FavoriteList from "./components/FavoriteList";
import FavoriteLists from "./components/FavoriteLists";
import MakeFavoriteList from "./components/MakeFavoriteList";
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
        <Route path={paths.favoriteList} component={FavoriteList} exact />
        <Route path={paths.favoriteLists} component={FavoriteLists} exact />
        <Route
          path={paths.home}
          component={user ? MakeFavoriteList : Signin}
          exact
        />
        <Redirect to={paths.home} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
