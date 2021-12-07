#!/usr/bin/env node

const prompt = require('./prompt');
const { run } = require('./commands');

(async () => {
  const { dirNames } = await prompt();
  await run({ dirNames, npmScriptName: 'dev' });
})();
