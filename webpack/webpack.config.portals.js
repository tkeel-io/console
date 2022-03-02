const path = require('path');

const config = require('config');
const ConfigWebpackPlugin = require('config-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs-extra');
const { merge } = require('webpack-merge');

const paths = require('../scripts/utils/paths');
const { staticDirectory } = require('./utils');

const webpackConfigPath = path.resolve(paths.root.webpack, 'webpack.config.js');
// eslint-disable-next-line import/no-dynamic-require
const webpackConfig = require(webpackConfigPath)();

function createConfigJsonFile() {
  const data = {
    code: 'io.tkeel.SUCCESS',
    msg: '',
    data: {
      client: config.client,
    },
  };
  fs.outputJSONSync(
    path.resolve(paths.cwd.self, 'public/config/config.json'),
    data
  );
}

createConfigJsonFile();

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
    new ConfigWebpackPlugin('PORTAL_GLOBALS'),
  ],
};

module.exports = merge(webpackConfig, webpackConfigPortals);
