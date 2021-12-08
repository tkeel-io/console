#!/usr/bin/env node

const prompt = require('./prompt');
const { run } = require('./commands');

(async () => {
  const { directoryNames } = await prompt();
  run({ directoryNames, npmScriptName: 'build' });
})();
