const path = require('path');

const _ = require('lodash');

const {
  PACKAGE_NAME_PREFIX,
  COMMON_PACKAGE_SIMPLE_NAMES,
} = require('../constants');

const rootDirectory = path.resolve(__dirname, '../..');
const currentWorkingDirectory = process.cwd();

const resolveRoot = (...relativePaths) =>
  path.resolve(rootDirectory, ...relativePaths);
const resolvePackages = (...relativePaths) =>
  resolveRoot('packages', ...relativePaths);
const resolveCwd = (...relativePaths) =>
  path.resolve(currentWorkingDirectory, ...relativePaths);

const commonPackages = () => {
  const obj = {};

  COMMON_PACKAGE_SIMPLE_NAMES.forEach((simpleName) => {
    const key = _.camelCase(simpleName);
    const name = `${PACKAGE_NAME_PREFIX}${simpleName}`;
    obj[key] = resolvePackages(name);
  });

  return obj;
};

module.exports = {
  resolveRoot,
  resolvePackages,
  resolveCwd,
  root: {
    self: rootDirectory,
    nodeModules: resolveRoot('node_modules'),
    scripts: resolveRoot('scripts'),
    webpack: resolveRoot('webpack'),
  },
  packages: {
    self: resolvePackages('.'),
    ...commonPackages(),
  },
  cwd: {
    self: currentWorkingDirectory,
    packageJson: resolveCwd('package.json'),
    public: resolveCwd('public'),
    src: resolveCwd('src'),
    dist: resolveCwd('dist'),
  },
};
