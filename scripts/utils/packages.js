const fs = require('fs-extra');
const { find } = require('lodash');
const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const { isPort } = require('validator');

const {
  PLUGIN_PACKAGE_NAME_PREFIX,
  COMMON_PACKAGE_SIMPLE_NAMES,
} = require('../constants');
const paths = require('./paths');

function getPluginPackageDirName({ simpleName }) {
  return `${PLUGIN_PACKAGE_NAME_PREFIX}${simpleName}`;
}

function getPluginPackagesDirNames() {
  const res = fs.readdirSync(paths.packages.self);

  return res.filter((relativePath) => {
    const absolutePath = paths.resolvePackages(relativePath);
    const stat = fs.statSync(absolutePath);
    return (
      stat.isDirectory() &&
      !COMMON_PACKAGE_SIMPLE_NAMES.includes(absolutePath) &&
      relativePath.startsWith(PLUGIN_PACKAGE_NAME_PREFIX)
    );
  });
}

function checkName({ simpleName }) {
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

function checkBasePath({ basePath }) {
  const pluginPackagesDotenvConfigs = getPluginPackagesDotenvConfigs();
  const flag = !find(pluginPackagesDotenvConfigs, { BASE_PATH: basePath });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate BASE_PATH';
  }

  return { flag, message };
}

function checkPort({ port }) {
  const pluginPackagesDotenvConfigs = getPluginPackagesDotenvConfigs();
  const value = find(pluginPackagesDotenvConfigs, { PORT: String(port) });

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
  getPluginPackageDirName,
  checkName,
  checkBasePath,
  checkPort,
};
