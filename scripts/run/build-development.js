#!/usr/bin/env node

const { getSelectedCanRunPackageInfos } = require('../utils/packages');
const { runNpmScripts } = require('./commands');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  const data = packageInfos.map(({ packageJson, env }) => ({
    packageName: packageJson.name,
    npmScriptName: 'build:development',
    env,
  }));
  runNpmScripts({ data });
})();
