import * as fs from "fs";
import * as path from "path";

const main = () => {
  const dest = path.resolve(process.cwd(), "firestore.rules");

  const copyRules = (filePath: string) => {
    try {
      if (!fs.existsSync(filePath)) return;
      fs.copyFileSync(filePath, dest);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  if (process.env.NODE_ENV === "test") {
    const filePath = path.resolve(__dirname, "./test-firestore.rules");
    copyRules(filePath);
  }
  if (process.env.NODE_ENV === "production") {
    const filePath = path.resolve(__dirname, "./origin-firestore.rules");
    copyRules(filePath);
  }

  return;
};

main();
