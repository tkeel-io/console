#!/usr/bin/env node

const prompt = require('./prompt');
const { runNpmScripts } = require('./commands');

(async () => {
  const data = await prompt({ npmScriptName: 'build' });
  runNpmScripts({ data });
})();
