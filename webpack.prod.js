const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanPlugin = require("clean-webpack-plugin");
require("dotenv").config({ path: __dirname + "/.env" });
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

console.log(
  "///////////////////////////\n" +
    "webpack.prod.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "production";
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
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
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../../docs/bundle-analyzer.html",
      openAnalyzer: true,
      defaultSizes: "stat",
    }),
  ],
});
