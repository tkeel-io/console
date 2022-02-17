/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('config');
const { merge } = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');

const paths = require('../scripts/utils/paths');
const { staticDirectory } = require('./utils');
const baseConfig = require('./webpack.config.base');

const serverPort = config?.server?.port ?? '';
const serverProxy = config?.server?.proxy ?? {};

const devConfig = {
  output: {
    filename: `${staticDirectory}js/[name].js`,
    chunkFilename: `${staticDirectory}js/[name].chunk.js`,
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: serverPort,
    proxy: serverProxy,
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
