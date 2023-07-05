const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');
const path = require('path');
const distPath = path.resolve(__dirname, '../dist');
module.exports = merge(common, {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    filename: 'index.js',
    path: distPath,
    library: {
      name: 'CustomWangElementVueTools',
      type: 'umd'
    }
  },
  externals: {
    // 这里的 value 需要跟 @wangeditor/editor 定义的 umd name 对应上，否则在 windows 就会找不到对应的对象
    // 具体值参考如下链接 https://github.com/wangeditor-team/wangEditor-v5/blob/main/packages/editor/rollup.config.js
    '@wangeditor/editor': {
      commonjs: '@wangeditor/editor',
      commonjs2: '@wangeditor/editor',
      amd: '@wangeditor/editor',
      root: 'wangEditor'
    },
    '@custom-wang-element/common': {
      commonjs: '@custom-wang-element/common',
      commonjs2: '@custom-wang-element/common',
      amd: '@custom-wang-element/common',
      root: 'CustomWangElementCommon'
    },
    '@custom-wang-element/core': {
      commonjs: '@custom-wang-element/core',
      commonjs2: '@custom-wang-element/core',
      amd: '@custom-wang-element/core',
      root: 'CustomWangElement'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [path.join(distPath, 'example'), path.join(distPath, 'test')]
    })
    
  ]
}); 
