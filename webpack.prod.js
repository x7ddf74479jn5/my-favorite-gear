const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CleanPlugin = require("clean-webpack-plugin");

console.log(
  "///////////////////////////\n" +
    "webpack.prod.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "production";
module.exports = merge(common, {
  mode: "production",
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
});
