import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React from "react";

import { AppRouter } from "@/AppRouter";
import Footer from "@/components/common/footer/Footer";
import NavigationBar from "@/components/common/menubar/NavigationBar";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const App: VFC = () => {
  return (
    <Root>
      <CssBaseline />
      <NavigationBar />
      <AppRouter />
      <Footer />
    </Root>
  );
};

export default App;
