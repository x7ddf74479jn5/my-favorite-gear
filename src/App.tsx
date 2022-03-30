import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import type { VFC } from "react";
import React from "react";

import { AppRouter } from "@/AppRouter";
import Footer from "@/components/common/footer/Footer";
import NavigationBar from "@/components/common/menubar/NavigationBar";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
  };
});
const App: VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavigationBar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
