#!/usr/bin/env node

const { runNpmScripts } = require('./commands');
const prompt = require('./prompt');

(async () => {
  const packageInfos = await prompt();
  const data = packageInfos.map(({ packageJson }) => ({
    packageName: packageJson.name,
    npmScriptName: 'dev',
  }));
  runNpmScripts({ data });
})();
