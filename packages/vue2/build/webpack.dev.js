const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve(__dirname, '../example/index.ts'),
  // devtool: 'eval-cheap-source-map',
  devtool: 'source-map',
  devServer: {
    port: '8080',
    compress: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      filename: 'index.html'
    })
  ]
});