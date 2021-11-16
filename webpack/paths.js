// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const rootDirectory = process.cwd();

const resolveApp = (relativePath) => path.resolve(rootDirectory, relativePath);

module.exports = {
  root: resolveApp('.'),
  nodeModules: resolveApp('node_modules'),
  config: resolveApp('config'),
  public: resolveApp('public'),
  src: resolveApp('src'),
  dist: resolveApp('dist'),
};
