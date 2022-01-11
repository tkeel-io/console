const fs = require('fs-extra');
const _ = require('lodash');
const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const { isPort } = require('validator');
const readPkg = require('read-pkg');

const {
  PACKAGES_PREFIX,
  PORTAL_PACKAGES,
  SHARED_PACKAGE_SIMPLE_NAMES,
  EXCLUDE_PACKAGE_DIRECTORY_NAMES,
} = require('../constants');
const paths = require('./paths');
const logger = require('./logger');

function getSimpleName({ directoryName }) {
  return directoryName.replace(PACKAGES_PREFIX.directoryName, '');
}

function getPluginName({ directoryName }) {
  return directoryName.replace(PACKAGES_PREFIX.pluginDirectoryName, '');
}

function getPluginPackageDirectoryName({ pluginName }) {
  return `${PACKAGES_PREFIX.pluginDirectoryName}${pluginName}`;
}

function readDirectoryNames({ portalFirst, excludeDirectoryNames } = {}) {
  const directoryNames = fs
    .readdirSync(paths.packages.self)
    .filter((directoryName) => !excludeDirectoryNames.includes(directoryName));

  if (portalFirst) {
    return directoryNames.sort((directoryName) =>
      PORTAL_PACKAGES.directoryNames.includes(directoryName) ? -1 : 1
    );
  }

  return directoryNames;
}

/**
 * @param {boolean} portalFirst
 * @param {string[]} excludeDirectoryNames
 * @param {string[]} includeDirectoryNames
 * @returns {Object[]}
 */
function readPackages({
  portalFirst = true,
  excludeDirectoryNames = EXCLUDE_PACKAGE_DIRECTORY_NAMES,
  includeDirectoryNames = readDirectoryNames({
    portalFirst,
    excludeDirectoryNames,
  }),
} = {}) {
  const packages = [];

  includeDirectoryNames.forEach((directoryName) => {
    const absolutePath = paths.resolvePackages(directoryName);
    const stat = fs.statSync(absolutePath);
    const isDirectory = stat.isDirectory();

    if (!isDirectory) {
      return;
    }

    const isPortal = PORTAL_PACKAGES.directoryNames.includes(directoryName);
    const isPlugin = directoryName.startsWith(
      PACKAGES_PREFIX.pluginDirectoryName
    );
    const simpleName = getSimpleName({ directoryName });
    const pluginName = isPlugin ? getPluginName({ directoryName }) : '';
    const isShared = SHARED_PACKAGE_SIMPLE_NAMES.includes(simpleName);
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
      isPortal,
      isShared,
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

function readBasePaths() {
  const data = [];

  readPackages().forEach(({ directoryName, dotenvConfig }) => {
    const basePath = dotenvConfig?.BASE_PATH;
    if (basePath) {
      const items = _.find(data, { basePath });
      if (items) {
        items.directoryNames.push(directoryName);
      } else {
        data.push({
          basePath,
          directoryNames: [directoryName],
        });
      }
    }
  });

  return data.sort((a, b) => a.devServerPort - b.devServerPort);
}

function showBasePaths() {
  const data = readBasePaths();
  let content = '';
  data.forEach(({ basePath, directoryNames }) => {
    content += `${basePath}: ${directoryNames.join(', ')}\n`;
  });
  logger.info('Current BASE_PATHs:');
  logger.info(content);
}

function readDevServerPorts() {
  const data = [];

  readPackages().forEach(({ directoryName, dotenvConfig }) => {
    const devServerPort = dotenvConfig?.DEV_SERVER_PORT;
    if (devServerPort) {
      const items = _.find(data, { devServerPort: Number(devServerPort) });
      if (items) {
        items.directoryNames.push(directoryName);
      } else {
        data.push({
          devServerPort: Number(devServerPort),
          directoryNames: [directoryName],
        });
      }
    }
  });

  return data.sort((a, b) => a.devServerPort - b.devServerPort);
}

function showDevServerPorts() {
  const devServerPorts = readDevServerPorts();
  let content = '';
  devServerPorts.forEach(({ devServerPort, directoryNames }) => {
    content += `${devServerPort}: ${directoryNames.join(', ')}\n`;
  });
  logger.info('Current DEV_SERVER_PORTs:');
  logger.info(content);
}

function checkPluginName({ pluginName }) {
  const directoryNames = readPackages()
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

function checkCanRunPackageBasePath({ basePath }) {
  const dotenvConfigs = readPackages()
    .filter(({ canRun }) => canRun)
    .map(({ dotenvConfig }) => dotenvConfig);
  // eslint-disable-next-line unicorn/prefer-array-some
  const flag = !_.find(dotenvConfigs, { BASE_PATH: basePath });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate BASE_PATH';
  }

  return { flag, message };
}

function checkCanRunPackageDevServerPort({ devServerPort }) {
  const dotenvConfigs = readPackages()
    .filter(({ canRun }) => canRun)
    .map(({ dotenvConfig }) => dotenvConfig);
  const value = _.find(dotenvConfigs, {
    DEV_SERVER_PORT: String(devServerPort),
  });

  let flag = true;
  let message = '';

  if (value) {
    flag = false;
    message = 'Error: Duplicate DEV_SERVER_PORT';
  }

  if (devServerPort && !isPort(String(devServerPort))) {
    flag = false;
    message = 'Error: Unavailable Port';
  }

  return { flag, message };
}

module.exports = {
  getPluginPackageDirectoryName,
  readPackages,
  showBasePaths,
  showDevServerPorts,
  checkPluginName,
  checkCanRunPackageBasePath,
  checkCanRunPackageDevServerPort,
};
