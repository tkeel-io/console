#!/usr/bin/env node

const { getCanRunPackageDirectoryNames } = require('../utils/packages');
const { run } = require('./commands');

const directoryNames = getCanRunPackageDirectoryNames();
run({ directoryNames, npmScriptName: 'dev' });
