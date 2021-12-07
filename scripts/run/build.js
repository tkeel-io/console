#!/usr/bin/env node

const prompt = require('./prompt');
const { run } = require('./commands');

async function cli() {
  const { dirNames } = await prompt();
  await run({ dirNames, npmScriptName: 'build' });
}

cli();
