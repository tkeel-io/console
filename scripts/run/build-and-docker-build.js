#!/usr/bin/env node

const build = require('../docker/build');
const push = require('../docker/push');
const { getSelectedCanRunPackageInfos } = require('../utils/packages');
const { runNpmScript } = require('./commands');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  packageInfos.forEach((packageInfo) => {
    const { packageJson, docker } = packageInfo;
    const packageName = packageJson.name;
    runNpmScript({ data: { packageName, npmScriptName: 'build' } });
    build(packageInfo);
    if (docker?.isDockerImagePush) {
      push(packageInfo);
    }
  });
})();
