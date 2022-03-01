const path = require('path');

const ConfigWebpackPlugin = require('config-webpack');
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
  plugins: [new ConfigWebpackPlugin('GLOBAL_PLUGIN_CONFIG')],
};

module.exports = merge(webpackConfig, webpackConfigPlugins);
