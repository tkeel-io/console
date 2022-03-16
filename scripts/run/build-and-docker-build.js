#!/usr/bin/env node

const build = require('../docker/build');
const { selectCanRunPackages } = require('../utils/packages');
const { runNpmScript } = require('./commands');

(async () => {
  const packageInfos = await selectCanRunPackages();
  packageInfos.forEach((packageInfo) => {
    const { packageJson } = packageInfo;
    const packageName = packageJson.name;
    runNpmScript({ data: { packageName, npmScriptName: 'build' } });
    build(packageInfo);
  });
})();
