#!/usr/bin/env node

const logger = require('../utils/logger');
const {
  checkPluginName,
  checkCanRunPackageBasePath,
  checkCanRunPackageServerPort,
  showBasePaths,
  showServerPorts,
} = require('../utils/packages');
const { getArgv } = require('./argv');
const { copyTemplates, writeTemplates, createFiles } = require('./files');
const prompt = require('./prompt');

(async () => {
  try {
    const argv = getArgv();
    const { name } = argv;

    const checkNameRes = checkPluginName({ pluginName: name });
    if (!checkNameRes.flag) {
      logger.error(checkNameRes.message);
      return;
    }

    const checkBasePathRes = checkCanRunPackageBasePath(argv);
    if (!checkBasePathRes.flag) {
      logger.error(checkBasePathRes.message);
      showBasePaths();
      return;
    }

    const checkServerPortRes = checkCanRunPackageServerPort(argv);
    if (!checkServerPortRes.flag) {
      logger.error(checkServerPortRes.message);
      showServerPorts();
      return;
    }

    const answers = await prompt({ argv });
    const options = { ...argv, ...answers };

    copyTemplates(options);
    writeTemplates(options);
    createFiles(options);

    logger.success('\nDONE\n');
  } catch (error) {
    logger.error(error);
  }
})();
