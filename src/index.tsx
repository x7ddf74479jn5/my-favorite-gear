import "./index.css";

import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { initializeFirebase } from "@/lib/firebase";

import App from "./App";
import theme from "./asset/theme";
import FirebaseApp from "./FirebaseApp";
import reportWebVitals from "./reportWebVitals";

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <FirebaseApp>
          <App />
        </FirebaseApp>
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div") // for test
);

reportWebVitals();
