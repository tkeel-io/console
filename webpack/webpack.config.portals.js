const path = require('path');

const { merge } = require('webpack-merge');

const paths = require('../scripts/utils/paths');

const webpackConfigPath = path.resolve(paths.root.webpack, 'webpack.config.js');

// eslint-disable-next-line import/no-dynamic-require
const webpackConfig = require(webpackConfigPath)();

const webpackConfigPlugins = {
  output: {
    path: path.resolve(paths.cwd.dist, process.env.PLATFORM),
  },
};

module.exports = merge(webpackConfig, webpackConfigPlugins);
