#!/usr/bin/env node

const build = require('../docker/build');
const { getSelectedCanRunPackageInfos } = require('../utils/packages');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  packageInfos.forEach((packageInfo) => build(packageInfo));
})();
