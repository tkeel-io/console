const path = require('node:path');

const _ = require('lodash');

const {
  PACKAGES_PREFIX,
  COMMON_PACKAGE_SIMPLE_NAMES,
} = require('../constants');

const rootPath = path.resolve(__dirname, '../..');
const currentWorkingPath = process.cwd();

const resolveRoot = (...relativePaths) =>
  path.resolve(rootPath, ...relativePaths);
const resolvePackages = (...relativePaths) =>
  resolveRoot('packages', ...relativePaths);
const resolveCwd = (...relativePaths) =>
  path.resolve(currentWorkingPath, ...relativePaths);

const commonPackages = () => {
  const obj = {};

  COMMON_PACKAGE_SIMPLE_NAMES.forEach((simpleName) => {
    const key = _.camelCase(simpleName);
    const name = `${PACKAGES_PREFIX.directoryName}${simpleName}`;
    obj[key] = resolvePackages(name);
  });

  return obj;
};

module.exports = {
  resolveRoot,
  resolvePackages,
  resolveCwd,
  root: {
    self: rootPath,
    nodeModules: resolveRoot('node_modules'),
    scripts: resolveRoot('scripts'),
    webpack: resolveRoot('webpack'),
    tsconfig: resolveRoot('tsconfig.json'),
  },
  packages: {
    self: resolvePackages('.'),
    ...commonPackages(),
  },
  cwd: {
    self: currentWorkingPath,
    packageJson: resolveCwd('package.json'),
    public: resolveCwd('public'),
    src: resolveCwd('src'),
    dist: resolveCwd('dist'),
  },
};
