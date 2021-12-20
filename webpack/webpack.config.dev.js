const { merge } = require('webpack-merge');
/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const paths = require('../scripts/utils/paths');
const baseConfig = require('./webpack.config.base');

let DEV_SERVER_PROXY = {};

try {
  DEV_SERVER_PROXY = JSON.parse(process.env.DEV_SERVER_PROXY);
  // eslint-disable-next-line no-empty
} catch {}

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: process.env.DEV_SERVER_PORT,
    proxy: DEV_SERVER_PROXY,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: paths.cwd.dist,
    },
    devMiddleware: {
      stats: 'errors-warnings',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new WebpackNotifierPlugin({ emoji: true }),
  ],
};

module.exports = merge(baseConfig, devConfig);
