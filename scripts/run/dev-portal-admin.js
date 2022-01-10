#!/usr/bin/env node

const {
  PACKAGE_DIRECTORY_NAME_PREFIX,
  PORTAL_PACKAGE_SIMPLE_NAME,
} = require('../constants');
const { run } = require('./commands');

const directoryNames = [
  `${PACKAGE_DIRECTORY_NAME_PREFIX}${PORTAL_PACKAGE_SIMPLE_NAME}`,
];
run({ directoryNames, npmScriptName: 'dev:admin' });
