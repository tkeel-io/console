#!/usr/bin/env node

const build = require('../docker/build');
const { readPackageInfos } = require('../utils/packages');
const { runNpmScript } = require('./commands');

const packages = readPackageInfos().filter(({ canRun }) => canRun);
packages.forEach((packageInfo) => {
  const { packageJson } = packageInfo;
  const packageName = packageJson.name;
  runNpmScript({ data: { packageName, npmScriptName: 'build' } });
  build(packageInfo);
});
