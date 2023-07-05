const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve(__dirname, '../example/index.ts'),
  // devtool: 'eval-cheap-source-map',
  devtool: 'source-map',
  devServer: {
    port: '8080',
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      filename: 'index.html'
    })
  ]
});