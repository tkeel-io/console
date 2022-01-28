/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('config');
const { merge } = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');

const paths = require('../scripts/utils/paths');
const baseConfig = require('./webpack.config.base');

const serverPort = config.get('server.port');
const serverProxy = config.get('server.proxy');

const devConfig = {
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
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
