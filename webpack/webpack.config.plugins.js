const path = require('path');

const paths = require('./paths');

const packageJson = path.resolve(paths.root, 'package.json');
// eslint-disable-next-line import/no-dynamic-require
const { packageName } = require(packageJson);

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
