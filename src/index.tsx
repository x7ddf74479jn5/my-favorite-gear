import "./index.css";

import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./asset/theme";
import FirebaseApp from "./FirebaseApp";
import reportWebVitals from "./reportWebVitals";

createRoot(
  document.getElementById("root") || document.createElement("div") // for test
).render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <FirebaseApp>
          <App />
        </FirebaseApp>
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
