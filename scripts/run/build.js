#!/usr/bin/env node

const { runNpmScripts } = require('./commands');
const prompt = require('./prompt');

(async () => {
  const packageNames = await prompt();
  const data = packageNames.map(({ packageName }) => ({
    packageName,
    npmScriptName: 'build',
  }));
  runNpmScripts({ data });
})();
