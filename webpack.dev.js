const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
    new Dotenv({
      path: path.resolve(__dirname, ".env.dev"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "static/index.html"),
      filename: "index.html",
      title: "My Favorite Gear",
      favicon: path.resolve(__dirname, "static/favicon.ico"),
      meta: {
        description: "みんなにおすすめしたいプロダクトを紹介しましょう！",
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
    new CopyPlugin({
      patterns: [
        {
          from: "static/mockServiceWorker.js",
          to: "mockServiceWorker.js",
        },
      ],
    }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    firebase: "firebase",
    firebaseui: "firebaseui",
  },
});
