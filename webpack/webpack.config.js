const path = require('path');

const paths = require('../scripts/utils/paths');

const envPath = path.resolve(paths.root.webpack, 'env');
const webpackConfigDevPath = path.resolve(
  paths.root.webpack,
  'webpack.config.dev'
);
const webpackConfigPodPath = path.resolve(
  paths.root.webpack,
  'webpack.config.prod'
);

// eslint-disable-next-line import/no-dynamic-require
const { isEnvDevelopment, isEnvProduction } = require(envPath);
// eslint-disable-next-line import/no-dynamic-require
const devConfig = require(webpackConfigDevPath);
// eslint-disable-next-line import/no-dynamic-require
const prodConfig = require(webpackConfigPodPath);

module.exports = () => {
  let config = null;
  if (isEnvDevelopment) {
    config = devConfig;
  } else if (isEnvProduction) {
    config = prodConfig;
  }
  return config;
};
