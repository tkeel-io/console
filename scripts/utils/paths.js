// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const rootDirectory = path.resolve(__dirname, '../..');
const currentWorkingDirectory = process.cwd();

const resolveWithRoot = (relativePath) =>
  path.resolve(rootDirectory, relativePath);
const resolveWithPackage = (relativePath) =>
  path.resolve(currentWorkingDirectory, relativePath);

module.exports = {
  root: {
    self: rootDirectory,
    nodeModules: resolveWithRoot('node_modules'),
    webpack: resolveWithRoot('webpack'),
  },
  cwd: {
    self: currentWorkingDirectory,
    packageJson: resolveWithPackage('package.json'),
    config: resolveWithPackage('config'),
    public: resolveWithPackage('public'),
    src: resolveWithPackage('src'),
    dist: resolveWithPackage('dist'),
  },
};
