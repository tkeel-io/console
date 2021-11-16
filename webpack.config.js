const { isEnvDevelopment, isEnvProduction } = require('./webpack/env');
const devConfig = require('./webpack/webpack.config.dev');
const prodConfig = require('./webpack/webpack.config.prod');

module.exports = () => {
  let config = null;
  if (isEnvDevelopment) {
    config = devConfig;
  } else if (isEnvProduction) {
    config = prodConfig;
  }
  return config;
};
