#!/usr/bin/env node

const { getCanRunPackagesDirNames } = require('../utils/packages');
const { run } = require('./commands');

async function cli() {
  const dirNames = getCanRunPackagesDirNames();
  await run({ dirNames, npmScriptName: 'build' });
}

cli();
