const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = resolve(__dirname, 'src');
const buildDir = resolve(__dirname, 'build')
const nodeModules = resolve(__dirname, 'node_modules');

module.exports = function() {
  return {
    entry: {
      app: [
        resolve(srcDir, 'index.js'),
      ],
    },
    devtool: 'cheap-eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcDir,
        nodeModules,
      ],
    },
    output: {
      filename: '[name].[hash].min.js',
      path: buildDir,
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
    ],
  };
};
