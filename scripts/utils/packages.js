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

function getPluginPackageDirectoryName({ simpleName }) {
  return `${PLUGIN_PACKAGE_NAME_PREFIX}${simpleName}`;
}

function getPackageDirectoryNames() {
  const res = fs.readdirSync(paths.packages.self);

  return res.filter((directoryName) => {
    const absolutePath = paths.resolvePackages(directoryName);
    const stat = fs.statSync(absolutePath);
    return stat.isDirectory();
  });
}

function getPluginPackageDirectoryNames() {
  const directoryNames = getPackageDirectoryNames();

  return directoryNames.filter((directoryName) => {
    const simpleName = directoryName.replace(PACKAGE_NAME_PREFIX, '');

    return (
      !COMMON_PACKAGE_SIMPLE_NAMES.includes(simpleName) &&
      directoryName.startsWith(PLUGIN_PACKAGE_NAME_PREFIX)
    );
  });
}

function getCanRunPackageDirectoryNames() {
  const directoryNames = getPackageDirectoryNames();

  return directoryNames.filter((directoryName) => {
    const simpleName = directoryName.replace(PACKAGE_NAME_PREFIX, '');
    return !SHARED_PACKAGE_SIMPLE_NAMES.includes(simpleName);
  });
}

function readPackages({ paths: pathList }) {
  const promises = pathList.map((path) =>
    readPkg({ cwd: path })
      .then((data) => data)
      .catch((error) => error)
  );

  return Promise.all(promises);
}

async function fetchPackageNames({ directoryNames }) {
  const pathList = directoryNames.map((directoryName) =>
    paths.resolvePackages(directoryName)
  );
  const data = await readPackages({ paths: pathList });

  return data.map(({ name }) => name);
}

function checkPluginName({ simpleName }) {
  const directoryNames = getPluginPackageDirectoryNames();
  const directoryName = getPluginPackageDirectoryName({ simpleName });
  const flag = !directoryNames.includes(directoryName);
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate Name';
  }

  return { flag, message };
}

function getPluginPackagesDotenvConfigs() {
  const directoryNames = getPluginPackageDirectoryNames();

  return directoryNames.map((directoryName) => {
    const absolutePath = paths.resolvePackages(directoryName);
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
  getPluginPackageDirectoryName,
  getPackageDirectoryNames,
  getCanRunPackageDirectoryNames,
  getPluginPackagesDotenvConfigs,
  fetchPackageNames,
  checkPluginName,
  checkPluginBasePath,
  checkPluginPort,
};
