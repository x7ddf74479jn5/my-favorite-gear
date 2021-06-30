import "./index.css";

import { MuiThemeProvider } from "@material-ui/core/styles";
import firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import theme from "./asset/theme";
import firebaseConfig from "./firebase-config";
import FirebaseApp from "./FirebaseApp";

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <FirebaseApp>
        <App />
      </FirebaseApp>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// import "./index.css";

// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
