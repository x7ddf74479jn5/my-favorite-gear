/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";

const main = () => {
  const dest = path.resolve(process.cwd(), "firebase.json");

  const copyFirebaseJson = (filePath: string) => {
    try {
      if (!fs.existsSync(filePath)) return;
      fs.copyFileSync(filePath, dest);
      console.log(
        "///////////////////////////\n" +
          "firebase.json is emitted.\n" +
          "///////////////////////////\n"
      );
    } catch (e) {
      console.log(e);
    }
  };

  const rules =
    process.env.NODE_ENV === "production"
      ? "origin-firebase.json"
      : "dev-firebase.json";
  const filePath = path.resolve(__dirname, rules);
  copyFirebaseJson(filePath);
};

main();
