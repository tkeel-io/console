const webpackBaseDir = `${__dirname}/webpack`;

// eslint-disable-next-line import/no-dynamic-require
const { isEnvDevelopment, isEnvProduction } = require(`${webpackBaseDir}/env`);

// eslint-disable-next-line import/no-dynamic-require
const devConfig = require(`${webpackBaseDir}/webpack.config.dev`);
// eslint-disable-next-line import/no-dynamic-require
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
