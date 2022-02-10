#!/usr/bin/env node

const { readPackageInfos } = require('../utils/packages');
const { runNpmScripts } = require('./commands');

const data = readPackageInfos()
  .filter(({ canRun }) => canRun)
  .map(({ packageJson }) => ({
    packageName: packageJson?.name,
    npmScriptName: 'dev',
  }));
runNpmScripts({ data });
