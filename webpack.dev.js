const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
require("dotenv").config({ path: __dirname + "/.env.dev" });

// eslint-disable-next-line no-console
console.log(
  "///////////////////////////\n" +
    "webpack.dev.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "development";

module.exports = merge(common, {
  entry: [path.resolve(__dirname, "./src/index.tsx")],
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
  ],
});
