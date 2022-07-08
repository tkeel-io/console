const path = require('node:path');

const config = require('config');
const _ = require('lodash');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');

const paths = require('../scripts/utils/paths');

const webpackConfigPath = path.resolve(paths.root.webpack, 'webpack.config.js');

// eslint-disable-next-line import/no-dynamic-require
const webpackConfig = require(webpackConfigPath)();
// eslint-disable-next-line import/no-dynamic-require
const { name: packageName } = require(paths.cwd.packageJson);

const webpackConfigPlugins = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
  plugins: [
    new DefinePlugin({
      GLOBAL_PLUGIN_CONFIG: JSON.stringify(
        _.pick(config, ['publicPath', 'client'])
      ),
    }),
  ],
};

module.exports = merge(webpackConfig, webpackConfigPlugins);
