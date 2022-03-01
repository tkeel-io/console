const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

const paths = require('../scripts/utils/paths');
const { staticDirectory } = require('./utils');

const webpackConfigPath = path.resolve(paths.root.webpack, 'webpack.config.js');

// eslint-disable-next-line import/no-dynamic-require
const webpackConfig = require(webpackConfigPath)();

const webpackConfigPortals = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.cwd.self, 'public/config/'),
          to: path.resolve(paths.cwd.dist, staticDirectory, 'config/'),
        },
      ],
    }),
  ],
};

module.exports = merge(webpackConfig, webpackConfigPortals);
