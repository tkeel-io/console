#!/usr/bin/env node

const {
  PACKAGE_DIRECTORY_NAME_PREFIX,
  CORE_PACKAGE_SIMPLE_NAME,
} = require('../constants');
const prompt = require('./prompt');
const { run } = require('./commands');

(async () => {
  const defaults = [
    `${PACKAGE_DIRECTORY_NAME_PREFIX}${CORE_PACKAGE_SIMPLE_NAME}`,
  ];
  const { directoryNames } = await prompt({ defaults });
  run({ directoryNames, npmScriptName: 'dev' });
})();
