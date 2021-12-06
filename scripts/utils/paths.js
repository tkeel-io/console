const path = require('path');

const { camelCase } = require('lodash');

const { COMMON_PACKAGE_SIMPLE_NAMES } = require('../constants');
const { getCommonPackageDirName } = require('./packages');

const rootDirectory = path.resolve(__dirname, '../..');
const currentWorkingDirectory = process.cwd();

const resolveWithRoot = (...relativePaths) =>
  path.resolve(rootDirectory, ...relativePaths);
const resolveWithPackages = (...relativePaths) =>
  resolveWithRoot('packages', ...relativePaths);
const resolveWithCwd = (...relativePaths) =>
  path.resolve(currentWorkingDirectory, ...relativePaths);

const commonPackages = () => {
  const obj = {};

  COMMON_PACKAGE_SIMPLE_NAMES.forEach((simpleName) => {
    const key = camelCase(simpleName);
    const name = getCommonPackageDirName({ simpleName });
    obj[key] = resolveWithPackages(name);
  });

  return obj;
};

module.exports = {
  resolveWithRoot,
  resolveWithPackages,
  resolveWithCwd,
  root: {
    self: rootDirectory,
    nodeModules: resolveWithRoot('node_modules'),
    scripts: resolveWithRoot('scripts'),
    webpack: resolveWithRoot('webpack'),
  },
  packages: {
    self: resolveWithPackages('.'),
    ...commonPackages(),
  },
  cwd: {
    self: currentWorkingDirectory,
    packageJson: resolveWithCwd('package.json'),
    public: resolveWithCwd('public'),
    src: resolveWithCwd('src'),
    dist: resolveWithCwd('dist'),
  },
};
