const config = require('config');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { dist: distPath } = require('./paths');
const baseConfig = require('./webpack.config.base');

const PORT = config.get('PORT');
const PROXY = config.get('PROXY');

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: PORT,
    proxy: PROXY,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: distPath,
    },
    devMiddleware: {
      stats: 'errors-warnings',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
