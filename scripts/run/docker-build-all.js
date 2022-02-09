#!/usr/bin/env node

const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');

const packageInfos = readPackageInfos().filter(({ canRun }) => canRun);
logger.log(packageInfos);
