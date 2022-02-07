#!/usr/bin/env node

const { runNpmScripts } = require('./commands');
const prompt = require('./prompt');

(async () => {
  const data = await prompt({ npmScriptName: 'dev' });
  runNpmScripts({ data });
})();
