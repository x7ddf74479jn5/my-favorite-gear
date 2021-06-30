const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      title: "My Favorite Gear",
      favicon: path.resolve(__dirname, "public/favicon.ico"),
      meta: { description: "test" },
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
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  target: ["web", "es6"],
};
