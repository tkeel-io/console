const fs = require('fs-extra');
const _ = require('lodash');
const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const { isPort } = require('validator');
const readPkg = require('read-pkg');

const {
  PACKAGE_NAME_PREFIX,
  PLUGIN_PACKAGE_NAME_PREFIX,
  SHARED_PACKAGE_SIMPLE_NAMES,
  COMMON_PACKAGE_SIMPLE_NAMES,
} = require('../constants');
const paths = require('./paths');

function readPackages({ paths: pathList }) {
  const promises = pathList.map((path) =>
    readPkg({ cwd: path })
      .then((data) => data)
      .catch((error) => error)
  );

  return Promise.all(promises);
}

function getPluginPackageDirName({ simpleName }) {
  return `${PLUGIN_PACKAGE_NAME_PREFIX}${simpleName}`;
}

function getPluginPackagesDirNames() {
  const res = fs.readdirSync(paths.packages.self);

  return res.filter((dirName) => {
    const absolutePath = paths.resolvePackages(dirName);
    const simpleName = dirName.replace(PACKAGE_NAME_PREFIX, '');
    const stat = fs.statSync(absolutePath);

    return (
      stat.isDirectory() &&
      !COMMON_PACKAGE_SIMPLE_NAMES.includes(simpleName) &&
      dirName.startsWith(PLUGIN_PACKAGE_NAME_PREFIX)
    );
  });
}

function getCanRunPackagesDirNames() {
  const res = fs.readdirSync(paths.packages.self);

  return res.filter((dirName) => {
    const absolutePath = paths.resolvePackages(dirName);
    const simpleName = dirName.replace(PACKAGE_NAME_PREFIX, '');
    const stat = fs.statSync(absolutePath);
    return (
      stat.isDirectory() && !SHARED_PACKAGE_SIMPLE_NAMES.includes(simpleName)
    );
  });
}

function checkPluginName({ simpleName }) {
  const pluginDirNames = getPluginPackagesDirNames();
  const dirName = getPluginPackageDirName({ simpleName });
  const flag = !pluginDirNames.includes(dirName);
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate Name';
  }

  return { flag, message };
}

function getPluginPackagesDotenvConfigs() {
  const dirNames = getPluginPackagesDirNames();

  return dirNames.map((dirName) => {
    const absolutePath = paths.resolvePackages(dirName);
    const dotenvFiles = dotenvFlow
      .listDotenvFiles(absolutePath, {
        node_env: 'development',
      })
      .filter((path) => fs.existsSync(path));
    const config = dotenvExpand(dotenvFlow.parse(dotenvFiles));

    return dotenvExpand(config);
  });
}

function checkPluginBasePath({ basePath }) {
  const pluginPackagesDotenvConfigs = getPluginPackagesDotenvConfigs();
  // eslint-disable-next-line unicorn/prefer-array-some
  const flag = !_.find(pluginPackagesDotenvConfigs, { BASE_PATH: basePath });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate BASE_PATH';
  }

  return { flag, message };
}

function checkPluginPort({ port }) {
  const pluginPackagesDotenvConfigs = getPluginPackagesDotenvConfigs();
  const value = _.find(pluginPackagesDotenvConfigs, { PORT: String(port) });

  let flag = true;
  let message = '';

  if (value) {
    flag = false;
    message = 'Error: Duplicate BASE_PATH';
  }

  if (port && !isPort(String(port))) {
    flag = false;
    message = 'Error: Unavailable Port';
  }

  return { flag, message };
}

module.exports = {
  readPackages,
  getPluginPackageDirName,
  getCanRunPackagesDirNames,
  checkPluginName,
  checkPluginBasePath,
  checkPluginPort,
};
