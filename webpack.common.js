const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: __dirname + "/.env" });

// const isProduction = process.env.NODE_ENV === "production";
// const isDevServer = process.env.DEV_SERVER === "true";
// const publicPath = isProduction ? "/" : `http://localhost:${devServerPort}`;

// export const find = (searchPath: string): string => {
//   const p = resolvePkg(searchPath);
//   if (p) {
//     return p;
//   }
//   throw new Error(`Not found: ${searchPath}`);
// };

// const devServerPlugins: webpack.Configuration["plugins"] = [
//   new HtmlWebpackPlugin({
//     template: "public/index.html",
//     inject: "head",
//     scriptLoading: "defer",
//     PUBLIC_URL: "AA",
//     React: isProduction
//       ? publicPath + "/scripts/react.production.min.js"
//       : "/scripts/react.development.js",
//     ReactDOM: isProduction
//       ? publicPath + "/scripts/react-dom.production.min.js"
//       : "/scripts/react-dom.development.js",
//     BootstrapCSS: "/stylesheets/bootstrap.min.css",
//   }),
// ];

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // publicPath: 'js',
    filename: "js/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["index"],
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      title: "My Favorite Gear",
      favicon: path.resolve(__dirname, "public/favicon.ico"),
      meta: { description: "test" },
    }),
    new webpack.DefinePlugin({
      __FB_API_KEY__: JSON.stringify(process.env.FB_API_KEY),
      __FB_AUTH_DOMAIN__: JSON.stringify(process.env.FB_AUTH_DOMAIN),
      __FB_PROJECT_ID__: JSON.stringify(process.env.FB_PROJECT_ID),
      __FB_STORAGE_BUCKET__: JSON.stringify(process.env.FB_STORAGE_BUCKET),
      __FB_MESSAGING_SENDER_ID__: JSON.stringify(
        process.env.FB_MESSAGING_SENDER_ID
      ),
      __FB_APP_ID__: JSON.stringify(process.env.FB_APP_ID),
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
