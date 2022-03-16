#!/usr/bin/env node

const { selectCanRunPackages } = require('../utils/packages');
const { runNpmScripts } = require('./commands');

(async () => {
  const packageInfos = await selectCanRunPackages();
  const data = packageInfos.map(({ packageJson }) => ({
    packageName: packageJson.name,
    npmScriptName: 'dev',
  }));
  runNpmScripts({ data });
})();
