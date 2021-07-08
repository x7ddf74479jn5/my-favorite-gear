import "./index.css";

import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "reportWebVitals";

import { initializeFirebase } from "../firebase";
import App from "./App";
import theme from "./asset/theme";
import FirebaseApp from "./FirebaseApp";

initializeFirebase();

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <FirebaseApp>
        <App />
      </FirebaseApp>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root") || document.createElement("div") // for test
);

reportWebVitals();
