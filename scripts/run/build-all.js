#!/usr/bin/env node

const { readPackages } = require('../utils/packages');
const { runNpmScripts } = require('./commands');

const data = readPackages()
  .filter(({ canRun }) => canRun)
  .map(({ packageJson }) => ({
    packageName: packageJson?.name,
    npmScriptName: 'build',
  }));
runNpmScripts({ data });
