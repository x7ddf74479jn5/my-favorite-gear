import * as functions from "firebase-functions";
import * as express from "express";
import basicAuth from "basic-auth-connect";

const runtimeOpts = {
  timeoutSeconds: 180,
  memory: "512MB" as const,
};

const USERNAME = functions.config().basic_auth.username;
const PASSWORD = functions.config().basic_auth.password;

const app = express();

app.all(
  "/*",
  basicAuth((user: unknown, password: unknown) => {
    return user === USERNAME && password === PASSWORD;
  })
);

app.use(express.static(process.cwd() + "/public/"));

export const firebaseAuth = functions
  .region("us-central1")
  .runWith(runtimeOpts)
  .https.onRequest(app);
