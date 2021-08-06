const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UnusedWebpackPlugin = require("unused-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
    firebaseui: "firebaseui",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      title: "My Favorite Gear",
      meta: {
        description: "みんなにおすすめしたいアイテムを紹介しましょう！",
      },
      React: "https://unpkg.com/react/umd/react.production.min.js",
      ReactDOM: "https://unpkg.com/react-dom/umd/react-dom.production.min.js",
      firebase: "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js",
      firebaseAuth: "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js",
      firebaseFirestore:
        "https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js",
      firebaseUIAuth:
        "https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth__ja.js",
      firebaseUIAuthCSS:
        "https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css",
    }),
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
    }),
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, "src")],
      exclude: ["*.test.ts"],
      root: __dirname,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: path.resolve(__dirname, "docs/prod-bundle-analyzer.html"),
      openAnalyzer: true,
      defaultSizes: "stat",
    }),
    new CopyPlugin({
      patterns: [{ from: "static/*", to: "[name][ext]" }],
    }),
  ],
});
