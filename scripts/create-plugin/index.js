#!/usr/bin/env node

const { getArgv } = require('./argv');
const prompt = require('./prompt');
const { copyTemplates, writeTemplates } = require('./files');
const { checkName, checkBasePath, checkPort } = require('../utils/packages');
const logger = require('../utils/logger');

async function cli() {
  const argv = getArgv();
  const { name } = argv;

  const checkNameRes = checkName({ simpleName: name });
  if (!checkNameRes.flag) {
    logger.error(checkNameRes.message);
    return;
  }

  const checkBasePathRes = checkBasePath(argv);
  if (!checkBasePathRes.flag) {
    logger.error(checkBasePathRes.message);
    return;
  }

  const checkPortRes = checkPort(argv);
  if (!checkPortRes.flag) {
    logger.error(checkPortRes.message);
    return;
  }

  const answers = await prompt({ argv });
  const options = { ...argv, ...answers };

  copyTemplates(options);
  writeTemplates(options);
}

cli();
