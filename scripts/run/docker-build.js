#!/usr/bin/env node

const build = require('../docker/build');
const push = require('../docker/push');
const { getSelectedCanRunPackageInfos } = require('../utils/packages');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  packageInfos.forEach((packageInfo) => {
    build(packageInfo);
    if (packageInfo.docker?.isDockerImagePush) {
      push(packageInfo);
    }
  });
})();
