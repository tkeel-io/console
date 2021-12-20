#!/usr/bin/env node

const { getArgv } = require('./argv');
const prompt = require('./prompt');
const { copyTemplates, writeTemplates } = require('./files');
const {
  checkPluginName,
  checkPluginBasePath,
  checkPluginDevServerPort,
} = require('../utils/packages');
const logger = require('../utils/logger');

(async () => {
  const argv = getArgv();
  const { name } = argv;

  const checkNameRes = checkPluginName({ pluginName: name });
  if (!checkNameRes.flag) {
    logger.error(checkNameRes.message);
    return;
  }

  const checkBasePathRes = checkPluginBasePath(argv);
  if (!checkBasePathRes.flag) {
    logger.error(checkBasePathRes.message);
    return;
  }

  const checkDevServerPortRes = checkPluginDevServerPort(argv);
  if (!checkDevServerPortRes.flag) {
    logger.error(checkDevServerPortRes.message);
    return;
  }

  const answers = await prompt({ argv });
  const options = { ...argv, ...answers };

  copyTemplates(options);
  writeTemplates(options);
})();
