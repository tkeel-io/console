const path = require('node:path');

const config = require('config');
const CopyPlugin = require('copy-webpack-plugin');
// const fs = require('fs-extra');
const _ = require('lodash');
// const shell = require('shelljs');
const { DefinePlugin } = require('webpack');
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
    new DefinePlugin({
      GLOBAL_PORTAL_CONFIG: JSON.stringify(
        _.pick(config, ['portalName', 'client', 'backend', 'mock'])
      ),
    }),
  ],
};

module.exports = merge(webpackConfig, webpackConfigPortals);
