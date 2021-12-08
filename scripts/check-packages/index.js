const _ = require('lodash');

const { getPackages } = require('../utils/packages');
const logger = require('../utils/logger');

function checkPackageNames() {
  logger.log('check package names');
  const directoryNames = getPackages().map(
    ({ directoryName }) => directoryName
  );
  const packages = getPackages({ directoryNames });
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
}

function checkPluginPort() {
  checkPluginDotenvConfigs({ dotenvConfigKey: 'PORT' });
}

checkPackageNames();
checkPluginBasePath();
checkPluginPort();
logger.log('DONE');
