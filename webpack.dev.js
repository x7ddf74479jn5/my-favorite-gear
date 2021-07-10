const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
// const webpack = require("webpack");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env.dev" });
const UnusedWebpackPlugin = require("unused-webpack-plugin");

console.log(
  "///////////////////////////\n" +
    "webpack.dev.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "development";

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    publicPath: "/",
    contentBase: "./dist",
    watchContentBase: true,
    open: false,
    hot: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: "/" }],
    },
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   __FB_API_KEY__: JSON.stringify(process.env.FB_API_KEY),
    //   __FB_AUTH_DOMAIN__: JSON.stringify(process.env.FB_AUTH_DOMAIN),
    //   __FB_PROJECT_ID__: JSON.stringify(process.env.FB_PROJECT_ID),
    //   __FB_STORAGE_BUCKET__: JSON.stringify(process.env.FB_STORAGE_BUCKET),
    //   __FB_MESSAGING_SENDER_ID__: JSON.stringify(
    //     process.env.FB_MESSAGING_SENDER_ID
    //   ),
    //   __FB_APP_ID__: JSON.stringify(process.env.FB_APP_ID),
    // }),
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, "src")],
      // exclude: ["*.test.js"],
      root: __dirname,
    }),
  ],
});
