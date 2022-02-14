#!/usr/bin/env node

const build = require('../docker/build');
const prompt = require('./prompt');

(async () => {
  const packages = await prompt();
  packages.forEach((packageInfo) => build(packageInfo));
})();
