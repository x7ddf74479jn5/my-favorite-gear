/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";

const main = () => {
  const dest = path.resolve(process.cwd(), "firestore.rules");

  const copyRules = (filePath: string) => {
    try {
      if (!fs.existsSync(filePath)) return;
      fs.copyFileSync(filePath, dest);
      console.log(
        "///////////////////////////\n" +
          "firestore.rules is emitted.\n" +
          "///////////////////////////\n"
      );
    } catch (e) {
      console.log(e);
    }
  };

  const rules =
    process.env.NODE_ENV === "test"
      ? "test-firestore.rules"
      : "origin-firestore.rules";
  const filePath = path.resolve(__dirname, rules);
  copyRules(filePath);
};

main();
