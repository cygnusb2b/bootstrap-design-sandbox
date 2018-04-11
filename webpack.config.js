const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = resolve(__dirname, 'src');
const buildDir = resolve(__dirname, 'build');
const publicDir = resolve(__dirname, 'public');
const nodeModules = resolve(__dirname, 'node_modules');

module.exports = function() {
  return {
    entry: {
      app: [
        resolve(srcDir, 'index.js'),
        resolve(publicDir, 'app.scss'),
      ],
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcDir,
        nodeModules,
      ],
    },
    output: {
      filename: '[name].js',
      path: buildDir,
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/file': 'http://server:8199',
      },
      contentBase: resolve(publicDir, 'html'),
      watchContentBase: true,
    },
    node: {
      url: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [ srcDir ],
          exclude: [ resolve(srcDir, 'server.js') ],
          enforce: 'pre',
          loader: 'eslint-loader',
        },
        {
          test: /\.jsx?$/,
          include: [ srcDir ],
          exclude: [ resolve(srcDir, 'server.js') ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        },
        {
          test: /\.(s*)css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function() {
                  return [require('precss'), require('autoprefixer')];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(srcDir, 'index.html'),
        inject: true,
      }),
    ],
  };
};
