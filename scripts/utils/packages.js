const path = require('path');

const fs = require('fs-extra');
const _ = require('lodash');
const nodeConfig = require('config');
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
    return directoryNames
      .sort((directoryName) =>
        PORTAL_PACKAGES.directoryNames.includes(directoryName) ? -1 : 1
      )
      .sort((directoryName) => {
        if (PORTAL_PACKAGES.directoryNames[0] === directoryName) {
          return -1;
        }
        return 0;
      });
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

    const configAbsolutePath = path.resolve(absolutePath, 'config');
    const config = nodeConfig.util.loadFileConfigs(configAbsolutePath);

    const dotenvFiles = dotenvFlow
      .listDotenvFiles(absolutePath, {
        node_env: 'development',
      })
      .filter((filePath) => fs.existsSync(filePath));
    const dotenvConfig = dotenvExpand.expand(dotenvFlow.parse(dotenvFiles));

    packages.push({
      directoryName,
      absolutePath,
      configAbsolutePath,
      isPortal,
      isShared,
      isPlugin,
      canRun,
      simpleName,
      pluginName,
      packageJson,
      config,
      dotenvConfig,
    });
  });

  return packages;
}

function readBasePaths() {
  const data = [];

  readPackages().forEach(({ directoryName, config }) => {
    const basePath = config?.basePath;
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

  return data.sort((a, b) => a.basePath - b.basePath);
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

function readServerPorts() {
  const data = [];

  readPackages().forEach(({ directoryName, config }) => {
    const serverPort = config?.server?.port;
    if (serverPort) {
      const items = _.find(data, { serverPort: String(serverPort) });
      if (items) {
        items.directoryNames.push(directoryName);
      } else {
        data.push({
          serverPort: String(serverPort),
          directoryNames: [directoryName],
        });
      }
    }
  });

  return data.sort((a, b) => a.serverPort - b.serverPort);
}

function showServerPorts() {
  const serverPorts = readServerPorts();
  let content = '';
  serverPorts.forEach(({ serverPort, directoryNames }) => {
    content += `${serverPort}: ${directoryNames.join(', ')}\n`;
  });
  logger.info('Current server ports: ');
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
  const configs = readPackages()
    .filter(({ canRun, config }) => canRun && config?.basePath)
    .map(({ config }) => config);
  // eslint-disable-next-line unicorn/prefer-array-some
  const flag = !_.find(configs, { basePath });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate base path';
  }

  return { flag, message };
}

function checkCanRunPackageServerPort({ serverPort }) {
  const configs = readPackages()
    .filter(({ canRun }) => canRun)
    .map(({ config }) => config);
  const value = _.find(configs, {
    server: {
      port: String(serverPort),
    },
  });

  let flag = true;
  let message = '';

  if (value) {
    flag = false;
    message = 'Error: Duplicate port';
  }

  if (serverPort && !isPort(String(serverPort))) {
    flag = false;
    message = 'Error: Unavailable Port';
  }

  return { flag, message };
}

module.exports = {
  getPluginPackageDirectoryName,
  readPackages,
  showBasePaths,
  showServerPorts,
  checkPluginName,
  checkCanRunPackageBasePath,
  checkCanRunPackageServerPort,
};
