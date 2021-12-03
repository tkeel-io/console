#!/usr/bin/env node

const { getArgv } = require('./argv');
const prompt = require('./prompt');

async function cli() {
  const argv = getArgv();
  const answers = await prompt({ argv });
  const options = { ...argv, ...answers };

  console.log(options);
}

cli();
