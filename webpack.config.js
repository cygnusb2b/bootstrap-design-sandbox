const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getProjects } = require('./src/server/utils');

const srcDir = path.resolve(__dirname, 'src');
const projectDir = path.resolve(__dirname, 'projects');
const buildDir = path.resolve(__dirname, 'dist');
const nodeModules = path.resolve(__dirname, 'node_modules');

const config = {
  cache: true,
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
    historyApiFallback: {
      rewrites: [],
    },
    proxy: {
      '/projects': 'http://server:8199',
      '/files': 'http://server:8199',
      '/file': 'http://server:8199',
    },
  },
  node: {
    url: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ srcDir ],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.js',
        },
      },
      {
        test: /\.jsx?$/,
        include: [ srcDir ],
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
              plugins: function() {
                return [require('precss'), require('autoprefixer')];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, 'index.html'),
      chunks: ['whatwg-fetch', 'core'],
      inject: true,
    }),
  ],
};

module.exports = () => new Promise((resolve, reject) => {
  const entry = {
    'whatwg-fetch': 'whatwg-fetch',
    core: path.resolve(srcDir, 'index.js'),
    project: path.resolve(srcDir, 'project.js'),
  };

  getProjects().then((projects) => {
    projects.forEach((project) => {
      const name = `${project.path}/app`;
      const dir = path.resolve(projectDir, project.path, 'index.js');
      entry[name] = dir;

      config.devServer.historyApiFallback.rewrites.push({
        from: new RegExp(`^\/${project.path}\/.*$`),
        to: path.join('/', project.path, 'index.html'),
      });

      config.plugins.push(new HtmlWebpackPlugin({
        filename: path.resolve(buildDir, project.path, 'index.html'),
        template: path.resolve(srcDir, 'index.html'),
        chunks: ['whatwg-fetch', 'project', name],
        inject: true,
      }));

    });
    config.entry = entry;
    resolve(config);
  }).catch(reject);
});
