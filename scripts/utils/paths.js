// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const rootDirectory = path.resolve(__dirname, '../..');
const currentWorkingDirectory = process.cwd();

const resolveWithRoot = (...relativePaths) =>
  path.resolve(rootDirectory, ...relativePaths);
const resolveWithPackages = (...relativePaths) =>
  resolveWithRoot('packages', ...relativePaths);
const resolveWithCwd = (...relativePaths) =>
  path.resolve(currentWorkingDirectory, ...relativePaths);

module.exports = {
  root: {
    self: rootDirectory,
    nodeModules: resolveWithRoot('node_modules'),
    webpack: resolveWithRoot('webpack'),
  },
  packages: {
    components: resolveWithPackages('tkeel-console-components'),
    hooks: resolveWithPackages('tkeel-console-hooks'),
    utils: resolveWithPackages('tkeel-console-utils'),
  },
  cwd: {
    self: currentWorkingDirectory,
    packageJson: resolveWithCwd('package.json'),
    config: resolveWithCwd('config'),
    public: resolveWithCwd('public'),
    src: resolveWithCwd('src'),
    dist: resolveWithCwd('dist'),
  },
};
