#!/usr/bin/env node

const { PORTAL_PACKAGES } = require('../constants');
const { runNpmScripts } = require('./commands');

runNpmScripts({
  data: [
    {
      packageName: PORTAL_PACKAGES.admin.packageName,
      npmScriptName: 'dev',
    },
  ],
});
