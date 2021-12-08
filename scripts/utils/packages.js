const fs = require('fs-extra');
const _ = require('lodash');
const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const { isPort } = require('validator');
const readPkg = require('read-pkg');

const {
  PACKAGE_DIRECTORY_NAME_PREFIX,
  PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX,
  SHARED_PACKAGE_SIMPLE_NAMES,
} = require('../constants');
const paths = require('./paths');

function getSimpleName({ directoryName }) {
  return directoryName.replace(PACKAGE_DIRECTORY_NAME_PREFIX, '');
}

function getPluginName({ directoryName }) {
  return directoryName.replace(PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX, '');
}

function getPluginPackageDirectoryName({ pluginName }) {
  return `${PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX}${pluginName}`;
}

function getPackages({
  directoryNames = fs.readdirSync(paths.packages.self),
} = {}) {
  const packages = [];

  directoryNames.forEach((directoryName) => {
    const absolutePath = paths.resolvePackages(directoryName);
    const stat = fs.statSync(absolutePath);
    const isDirectory = stat.isDirectory();

    if (!isDirectory) {
      return;
    }

    const isPlugin = directoryName.startsWith(
      PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX
    );
    const simpleName = getSimpleName({ directoryName });
    const pluginName = isPlugin ? getPluginName({ directoryName }) : '';
    const canRun = !SHARED_PACKAGE_SIMPLE_NAMES.includes(simpleName);

    const packageJson = readPkg.sync({ cwd: absolutePath });

    const dotenvFiles = dotenvFlow
      .listDotenvFiles(absolutePath, {
        node_env: 'development',
      })
      .filter((path) => fs.existsSync(path));
    const dotenvConfig = dotenvExpand(dotenvFlow.parse(dotenvFiles));

    packages.push({
      directoryName,
      absolutePath,
      isPlugin,
      canRun,
      simpleName,
      pluginName,
      packageJson,
      dotenvConfig,
    });
  });

  return packages;
}

function getCanRunPackageDirectoryNames() {
  return getPackages()
    .filter(({ canRun }) => canRun)
    .map(({ directoryName }) => directoryName);
}

function getPluginPackageDotenvConfigs() {
  return getPackages()
    .filter(({ isPlugin }) => isPlugin)
    .map(({ dotenvConfig }) => dotenvConfig);
}

function checkPluginName({ pluginName }) {
  const directoryNames = getPackages()
    .filter(({ isPlugin }) => isPlugin)
    .map(({ directoryName }) => directoryName);
  const directoryName = getPluginPackageDirectoryName({ pluginName });
  const flag = !directoryNames.includes(directoryName);
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate Name';
  }

  return { flag, message };
}

function checkPluginBasePath({ basePath }) {
  const pluginPackagesDotenvConfigs = getPluginPackageDotenvConfigs();
  // eslint-disable-next-line unicorn/prefer-array-some
  const flag = !_.find(pluginPackagesDotenvConfigs, { BASE_PATH: basePath });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate BASE_PATH';
  }

  return { flag, message };
}

function checkPluginPort({ port }) {
  const pluginPackagesDotenvConfigs = getPluginPackageDotenvConfigs();
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
  getPluginPackageDirectoryName,
  getPackages,
  getCanRunPackageDirectoryNames,
  getPluginPackageDotenvConfigs,
  checkPluginName,
  checkPluginBasePath,
  checkPluginPort,
};
