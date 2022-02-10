#!/usr/bin/env node

const fs = require('fs-extra');
const shell = require('shelljs');

const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');
const paths = require('../utils/paths');

const settingsFilePath = paths.resolveRoot('.vscode', 'settings.json');
const settings = fs.readJSONSync(settingsFilePath);
const packages = readPackageInfos({ portalFirst: false });

settings['path-intellisense.mappings'] = {};

packages.forEach(({ directoryName }) => {
  settings['path-intellisense.mappings'][
    `@/${directoryName}`
  ] = `\${workspaceFolder}/packages/${directoryName}/src`;
});

fs.writeJSONSync(settingsFilePath, settings);

shell.exec(`prettier --write ${settingsFilePath}`);

logger.info('\ninit .vscode/settings.json: DONE');
