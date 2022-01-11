const fs = require('fs-extra');
const shell = require('shelljs');

const { readPackages } = require('../utils/packages');
const { log } = require('../utils/logger');
const paths = require('../utils/paths');

const settingsFilePath = paths.resolveRoot('.vscode', 'settings.json');
const settings = fs.readJSONSync(settingsFilePath);
const packages = readPackages({ portalFirst: false });

settings['path-intellisense.mappings'] = {};

packages.forEach(({ directoryName }) => {
  settings['path-intellisense.mappings'][
    `@/${directoryName}`
  ] = `\${workspaceFolder}/packages/${directoryName}/src`;
});

fs.writeJSONSync(settingsFilePath, settings);

shell.exec(`prettier --write ${settingsFilePath}`);

log('init .vscode/settings.json: DONE');
