const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [],
});

// eslint-disable-next-line
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
