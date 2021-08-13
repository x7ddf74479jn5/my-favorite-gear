const path = require("path");

const essentialLibs = /(react-router|react-router-dom|history|web-vital)/;

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
  plugins: [],
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
