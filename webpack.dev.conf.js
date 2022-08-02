const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map", // eval-source-map
  devServer: {
    port: 9000,
    watchFiles: ["*.pug"],
    compress: true,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

// eslint-disable-next-line
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
