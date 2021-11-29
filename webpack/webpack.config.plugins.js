const paths = require('../scripts/utils/paths');

// eslint-disable-next-line import/no-dynamic-require
const { packageName } = require(paths.cwd.packageJson);

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
