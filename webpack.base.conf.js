const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: PATHS.src,
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        loader: "pug3-loader",
      },

      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },      

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]",
        },
      },

      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "~": PATHS.src,
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),

    new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/index.pug`,
      filename: "./index.html",
      chunks: ['main'],
    }),   
  ],
};
