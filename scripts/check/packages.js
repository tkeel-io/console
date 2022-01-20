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

function checkCanRunPackageConfigs({ configKey }) {
  logger.log(`check plugins ${configKey}`);
  const packages = readPackages().filter(
    ({ canRun, config }) => canRun && config[configKey]
  );
  const counter = _.countBy(packages, `config[${configKey}]`);
  let isSuccess = true;

  Object.keys(counter).forEach((configValue) => {
    const count = counter[configValue];

    if (count > 1) {
      isSuccess = false;
      const directoryNames = packages
        .filter(({ config }) => config[configKey] === configValue)
        .map(({ directoryName }) => directoryName);
      logger.error(
        `Duplicate ${configKey}: ${configValue} (${directoryNames.join(', ')})`
      );
    }
  });

  if (isSuccess) {
    logger.success('success');
    logger.log();
  } else {
    logger.log();
    switch (configKey) {
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
  checkCanRunPackageConfigs({ configKey: 'basePath' });
}

function checkCanRunPackageServerPort() {
  checkCanRunPackageConfigs({ configKey: 'server.port' });
}

checkPackageNames();
checkCanRunPackageBasePath();
checkCanRunPackageServerPort();

logger.log('DONE');
