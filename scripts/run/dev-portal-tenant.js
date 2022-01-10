#!/usr/bin/env node

const { PORTAL_PACKAGE_NAME, PORTAL_PACKAGE_INFOS } = require('../constants');
const { runNpmScripts } = require('./commands');

runNpmScripts({
  data: [
    {
      packageName: PORTAL_PACKAGE_NAME,
      npmScriptName: `dev:${PORTAL_PACKAGE_INFOS[1].platform}`,
    },
  ],
});
