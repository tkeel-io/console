/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-dynamic-require */
const webpackBaseDir = `${__dirname}/webpack`;
const { isEnvDevelopment, isEnvProduction } = require(`${webpackBaseDir}/env`);

const devConfig = require(`${webpackBaseDir}/webpack.config.dev`);
const prodConfig = require(`${webpackBaseDir}/webpack.config.prod`);

module.exports = () => {
  let config = null;
  if (isEnvDevelopment) {
    config = devConfig;
  } else if (isEnvProduction) {
    config = prodConfig;
  }
  return config;
};
