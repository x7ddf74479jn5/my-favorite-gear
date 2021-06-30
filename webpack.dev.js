const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

console.log(
  "///////////////////////////\n" +
    "webpack.dev.js is loaded.\n" +
    "///////////////////////////\n"
);
process.env.NODE_ENV = "development";

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  // watch: true,
  devServer: {
    port: 3000,
    publicPath: "/",
    contentBase: "./dist", // 'dist'から'/dist'にしたら、dist直下にない、htmlやjs以下のフォルダを読み込むようになった　なんでや
    watchContentBase: true, // contentBase で指定された静的ファイルに対しても変更監視を行い、変更を検知した場合にライブリロードします
    open: true,
    openPage: "",
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/*/, to: "/" },
        // { from: /\/index/, to: "/html/index.html" },
      ],
    },
  },
});
