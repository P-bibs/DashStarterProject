var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: "./src/Main.tsx",
  devtool: "source-map",
  output: {
    filename: "./bundle.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: [/\.tsx?$/, /\.ts?$/,],
      loader: "awesome-typescript-loader",
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss|css$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ]
    },
    {
      test: /\.txt|md$/i,
      loader: "raw-loader"
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "deploy", to: path.join(__dirname, "build") }])
  ],
  devServer: {
    compress: false,
    host: "localhost",
    contentBase: path.join(__dirname, 'deploy'),
    port: 1050,
    hot: true,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};