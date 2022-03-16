#!/usr/bin/env node

const { getSelectedCanRunPackageInfos } = require('../utils/packages');
const { runNpmScripts } = require('./commands');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  const data = packageInfos.map(({ packageJson }) => ({
    packageName: packageJson.name,
    npmScriptName: 'build',
  }));
  runNpmScripts({ data });
})();
