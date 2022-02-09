#!/usr/bin/env node

const logger = require('../utils/logger');
const { readPackages } = require('../utils/packages');

const packageInfos = readPackages().filter(({ canRun }) => canRun);
logger.log(packageInfos);
