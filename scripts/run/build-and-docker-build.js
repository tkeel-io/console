#!/usr/bin/env node

const build = require('../docker/build');
const { runNpmScript } = require('./commands');
const prompt = require('./prompt');

(async () => {
  const packages = await prompt();
  packages.forEach((packageInfo) => {
    const { packageJson } = packageInfo;
    const packageName = packageJson.name;
    runNpmScript({ data: { packageName, npmScriptName: 'build' } });
    build(packageInfo);
  });
})();
