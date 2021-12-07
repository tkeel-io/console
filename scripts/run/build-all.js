#!/usr/bin/env node

const { getCanRunPackagesDirNames } = require('../utils/packages');
const { run } = require('./commands');

(async () => {
  const dirNames = getCanRunPackagesDirNames();
  await run({ dirNames, npmScriptName: 'build' });
})();
