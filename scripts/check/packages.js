#!/usr/bin/env node

const _ = require('lodash');

const {
  readPackages,
  showBasePaths,
  showServerPorts,
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

function checkCanRunPackageConfigs({ configKeyPath }) {
  logger.log(`check plugins ${configKeyPath}`);
  const packages = readPackages().filter(
    ({ canRun, config }) => canRun && _.get(config, configKeyPath)
  );
  const counter = _.countBy(packages, `config.${configKeyPath}`);
  let isSuccess = true;

  Object.keys(counter).forEach((configValue) => {
    const count = counter[configValue];

    if (count > 1) {
      isSuccess = false;
      const directoryNames = packages
        .filter(({ config }) => _.get(config, configKeyPath) === configValue)
        .map(({ directoryName }) => directoryName);
      logger.error(
        `Duplicate ${configKeyPath}: ${configValue} (${directoryNames.join(
          ', '
        )})`
      );
    }
  });

  if (isSuccess) {
    logger.success('success');
    logger.log();
  } else {
    logger.log();
    switch (configKeyPath) {
      case 'basePath':
        showBasePaths();
        break;
      case 'server.port':
        showServerPorts();
        break;
      default:
        break;
    }
  }
}

function checkCanRunPackageBasePath() {
  checkCanRunPackageConfigs({ configKeyPath: 'basePath' });
}

function checkCanRunPackageServerPort() {
  checkCanRunPackageConfigs({ configKeyPath: 'server.port' });
}

checkPackageNames();
checkCanRunPackageBasePath();
checkCanRunPackageServerPort();

logger.log('DONE');
