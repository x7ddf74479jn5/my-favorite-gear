const functions = require("firebase-functions");
const express = require("express");

const basicAuth = require("basic-auth-connect");

const USERNAME = functions.config().basic_auth.username;
const PASSWORD = functions.config().basic_auth.password;

const app = express();

// Basic Auth
app.all(
  "/*",
  basicAuth((user: unknown, password: unknown) => {
    return user === USERNAME && password === PASSWORD;
  })
);

app.use(express.static(process.cwd() + "/public/"));
exports.firebaseAuth = functions.https.onRequest(app);
