const path = require('path');

const nodeConfig = require('config');
const dotenvExpand = require('dotenv-expand');
const dotenvFlow = require('dotenv-flow');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const _ = require('lodash');
const readPkg = require('read-pkg');
const { isPort } = require('validator');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

const {
  PACKAGES_PREFIX,
  PORTAL_PACKAGES,
  SHARED_PACKAGE_SIMPLE_NAMES,
  EXCLUDE_PACKAGE_DIRECTORY_NAMES,
} = require('../constants');
const logger = require('./logger');
const paths = require('./paths');

function getSimpleName({ directoryName }) {
  return directoryName.replace(PACKAGES_PREFIX.directoryName, '');
}

function getPluginName({ directoryName }) {
  return directoryName.replace(PACKAGES_PREFIX.pluginDirectoryName, '');
}

function getDockerImageName({ directoryName }) {
  return directoryName.replace(
    PACKAGES_PREFIX.directoryName,
    PACKAGES_PREFIX.dockerImageName
  );
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
function readPackageInfos({
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
    const portalName = directoryName.split('-')[3];
    const dockerImageName = getDockerImageName({ directoryName });
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
      portalName,
      packageJson,
      docker: {
        imageName: dockerImageName,
      },
      config,
      dotenvConfig,
    });
  });

  return packages;
}

function readBasePaths() {
  const data = [];

  readPackageInfos().forEach(({ directoryName, config }) => {
    const basePath = config?.client?.basePath;
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
    content += `${basePath} (${directoryNames.length}): ${directoryNames.join(
      ', '
    )}\n`;
  });
  logger.info('Current base paths:');
  logger.info(content);
}

function readServerPorts() {
  const data = [];

  readPackageInfos().forEach(({ directoryName, config }) => {
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
    content += `${serverPort} (${directoryNames.length}): ${directoryNames.join(
      ', '
    )}\n`;
  });
  logger.info('Current server ports: ');
  logger.info(content);
}

function checkPluginName({ pluginName }) {
  const directoryNames = readPackageInfos()
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
  const configs = readPackageInfos()
    .filter(({ canRun, config }) => canRun && config?.client?.basePath)
    .map(({ config }) => config);
  // eslint-disable-next-line unicorn/prefer-array-some
  const flag = !_.find(configs, { config: { basePath } });
  let message = '';

  if (!flag) {
    message = 'Error: Duplicate base path';
  }

  return { flag, message };
}

function checkCanRunPackageServerPort({ serverPort }) {
  const configs = readPackageInfos()
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

function getCliArgv() {
  const { argv } = yargs(hideBin(process.argv))
    .options({
      'package-names': {
        type: 'csv',
        desc: 'package names',
      },
      'docker-image-tag': {
        type: 'string',
        desc: 'Docker image tag',
      },
    })
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version');

  return argv;
}

async function selectCanRunPackages({
  packageInfos = readPackageInfos(),
} = {}) {
  const message = 'Select packages';
  const choices = packageInfos.map((packageInfo) => {
    const { packageJson } = packageInfo;
    const { name } = packageJson;
    return { name, value: packageInfo };
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'data',
      message,
      choices,
      validate(value) {
        if (value.length === 0) {
          return `Please ${message}`;
        }
        return true;
      },
      pageSize: 10,
      loop: false,
    },
  ];

  const { data } = await inquirer.prompt(questions);

  return data;
}

async function getSelectedCanRunPackageInfos() {
  const packageInfos = readPackageInfos();
  const canRunPackageInfos = packageInfos.filter(({ canRun }) => canRun);
  const incorrectPackageNames = [];

  const argv = getCliArgv();
  const inputPackageNamesString = argv?.packageNames ?? '';
  const inputPackageNames = inputPackageNamesString.split(',').filter(Boolean);

  const inputPackageInfos =
    inputPackageNamesString === 'all'
      ? canRunPackageInfos
      : inputPackageNames
          .map((packageName) => {
            const inputPackageInfo = _.find(
              canRunPackageInfos,
              (canRunPackageInfo) =>
                canRunPackageInfo.packageJson.name === packageName
            );

            if (!inputPackageInfo) {
              incorrectPackageNames.push(packageName);
            }

            return inputPackageInfo;
          })
          .filter(Boolean);

  if (inputPackageNames.length > 0 && incorrectPackageNames.length > 0) {
    throw new Error(
      `Error: incorrect package names: ${incorrectPackageNames.join(', ')}`
    );
  }

  if (inputPackageInfos.length === 0) {
    // eslint-disable-next-line no-return-await
    return await selectCanRunPackages({ packageInfos: canRunPackageInfos });
  }

  return inputPackageInfos;
}

module.exports = {
  getPluginPackageDirectoryName,
  readPackageInfos,
  showBasePaths,
  showServerPorts,
  checkPluginName,
  checkCanRunPackageBasePath,
  checkCanRunPackageServerPort,
  selectCanRunPackages,
  getSelectedCanRunPackageInfos,
};
