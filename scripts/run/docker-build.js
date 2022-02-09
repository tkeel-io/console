#!/usr/bin/env node

const logger = require('../utils/logger');
const prompt = require('./prompt');

(async () => {
  const packageInfos = await prompt();
  logger.log(packageInfos);
})();
