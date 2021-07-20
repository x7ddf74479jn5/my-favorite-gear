const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const essentialLibs =
  /(mobx|mobx-react|react-router|react-router-dom|history|web-vital)/;

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    clean: true,
    publicPath: "/",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    // minimize: isProduction,
    // minimize: false,
    // minimizer: ["...", new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        // default: false,
        // defaultVendors: false,
        essential: {
          name: "essential",
          chunks: "initial",
          test: (m) => {
            return essentialLibs.test(m.resource);
          },
          enforce: true,
        },
        vendor: {
          name: "vendor",
          chunks: "initial",
          test: (m) => {
            if (essentialLibs.test(m.resource)) {
              return false;
            }
            return /node_modules/.test(m.resource);
          },
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "static/index.html"),
      filename: "index.html",
      title: "My Favorite Gear",
      favicon: path.resolve(__dirname, "static/favicon.ico"),
      meta: { description: "test" },
      React: isProduction
        ? "https://unpkg.com/react/umd/react.production.min.js"
        : "",
      ReactDOM: isProduction
        ? "https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        : "",
      MaterialUI: isProduction
        ? "https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js"
        : "",
      firebase: isProduction
        ? "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"
        : "",
      firebaseAuth: isProduction
        ? "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"
        : "",
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
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.ts?$/],
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|webp)&/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
  },
  target: ["web", "es6"],
};
