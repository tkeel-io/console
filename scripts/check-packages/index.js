const _ = require('lodash');

const {
  readPackages,
  showBasePaths,
  showDevServerPorts,
} = require('../utils/packages');
const logger = require('../utils/logger');

function checkPackageNames() {
  logger.log('check package names');
  const packages = readPackages();
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

function checkCanRunPackageDotenvConfigs({ dotenvConfigKey }) {
  logger.log(`check plugins ${dotenvConfigKey}`);
  const packages = readPackages().filter(({ canRun }) => canRun);
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

function checkCanRunPackageBasePath() {
  checkCanRunPackageDotenvConfigs({ dotenvConfigKey: 'BASE_PATH' });
  showBasePaths();
}

function checkCanRunPackageDevServerPort() {
  checkCanRunPackageDotenvConfigs({ dotenvConfigKey: 'DEV_SERVER_PORT' });
  showDevServerPorts();
}

checkPackageNames();
checkCanRunPackageBasePath();
checkCanRunPackageDevServerPort();

logger.log('DONE');
