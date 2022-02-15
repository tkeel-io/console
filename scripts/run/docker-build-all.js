#!/usr/bin/env node

const build = require('../docker/build');
const { readPackageInfos } = require('../utils/packages');

const packages = readPackageInfos().filter(({ canRun }) => canRun);
packages.forEach((packageInfo) => build(packageInfo));
