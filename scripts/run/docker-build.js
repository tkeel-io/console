#!/usr/bin/env node

const build = require('../docker/build');
const { selectCanRunPackages } = require('../utils/packages');

(async () => {
  const packageInfos = await selectCanRunPackages();
  packageInfos.forEach((packageInfo) => build(packageInfo));
})();
