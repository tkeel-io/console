#!/usr/bin/env node

const { runNpmScripts } = require('./commands');
const prompt = require('./prompt');

(async () => {
  const packages = await prompt();
  const data = packages.map(({ packageJson }) => ({
    packageName: packageJson.name,
    npmScriptName: 'build',
  }));
  runNpmScripts({ data });
})();
