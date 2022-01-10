const _ = require('lodash');

const {
  PORTAL_PACKAGE_DIRECTORY_NAME,
  PORTAL_PACKAGE_INFOS,
} = require('../constants');
const {
  getPackages,
  showPluginBasePaths,
  showDevServerPorts,
} = require('../utils/packages');
const logger = require('../utils/logger');

function checkPackageNames() {
  logger.log('check package names');
  const directoryNames = getPackages().map(
    ({ directoryName }) => directoryName
  );
  const packages = getPackages({ includeDirectoryNames: directoryNames });
  const counter = _.countBy(packages, 'packageJson.name');
  let isSuccess = true;
  Object.keys(counter).forEach((key) => {
    const value = counter[key];

    if (value > 1) {
      isSuccess = false;
      logger.error(`Duplicate package: ${key} (${value})`);
    }
  });

  if (isSuccess) {
    logger.success('success');
  }
  logger.log();
}

function checkPluginDotenvConfigs({ dotenvConfigKey }) {
  logger.log(`check plugins ${dotenvConfigKey}`);
  const packages = getPackages().filter(({ isPlugin }) => isPlugin);

  if (dotenvConfigKey === 'DEV_SERVER_PORT') {
    packages.unshift(
      ...PORTAL_PACKAGE_INFOS.map(({ devServerPort }) => ({
        directoryName: PORTAL_PACKAGE_DIRECTORY_NAME,
        dotenvConfig: {
          DEV_SERVER_PORT: devServerPort,
        },
      }))
    );
  }

  const counter = _.countBy(packages, `dotenvConfig[${dotenvConfigKey}]`);
  let isSuccess = true;

  Object.keys(counter).forEach((dotenvConfigValue) => {
    const count = counter[dotenvConfigValue];

    if (count > 1) {
      isSuccess = false;
      const directoryNames = packages
        .filter(
          ({ dotenvConfig }) =>
            dotenvConfig[dotenvConfigKey] === dotenvConfigValue
        )
        .map(({ directoryName }) => directoryName);
      logger.error(
        `Duplicate ${dotenvConfigKey}: ${dotenvConfigValue} (${directoryNames.join(
          ', '
        )})`
      );
    }
  });

  if (isSuccess) {
    logger.success('success');
  }
  logger.log();
}

function checkPluginBasePath() {
  checkPluginDotenvConfigs({ dotenvConfigKey: 'BASE_PATH' });
  showPluginBasePaths();
}

function checkPluginDevServerPort() {
  checkPluginDotenvConfigs({ dotenvConfigKey: 'DEV_SERVER_PORT' });
  showDevServerPorts();
}

checkPackageNames();
checkPluginBasePath();
checkPluginDevServerPort();

logger.log('DONE');
