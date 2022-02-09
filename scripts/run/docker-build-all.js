#!/usr/bin/env node

const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');

const packages = readPackageInfos().filter(({ canRun }) => canRun);
logger.log(packages);
