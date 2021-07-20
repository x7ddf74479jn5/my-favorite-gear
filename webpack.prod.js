const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UnusedWebpackPlugin = require("unused-webpack-plugin");

require("dotenv").config({ path: __dirname + "/.env" });

// eslint-disable-next-line no-console
console.log(
  "///////////////////////////\n" +
    "webpack.prod.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "production";
module.exports = merge(common, {
  mode: "production",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    firebase: "firebase",
    "firebase/auth": "",
    "firebase/storage": "",
    "firebase/firestore": "",
    "@material-ui/core": "MaterialUI",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.FB_API_KEY": JSON.stringify(process.env.FB_API_KEY),
      "process.env.FB_AUTH_DOMAIN": JSON.stringify(process.env.FB_AUTH_DOMAIN),
      "process.env.FB_PROJECT_ID": JSON.stringify(process.env.FB_PROJECT_ID),
      "process.env.FB_STORAGE_BUCKET": JSON.stringify(
        process.env.FB_STORAGE_BUCKET
      ),
      "process.env.FB_MESSAGING_SENDER_ID": JSON.stringify(
        process.env.FB_MESSAGING_SENDER_ID
      ),
      "process.env.FB_APP_ID": JSON.stringify(process.env.FB_APP_ID),
    }),
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, "src")],
      exclude: ["*.test.ts"],
      root: __dirname,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../../docs/bundle-analyzer.html",
      openAnalyzer: true,
      defaultSizes: "stat",
    }),
  ],
});
