#!/usr/bin/env node

const fs = require('fs-extra');
const shell = require('shelljs');

const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');
const paths = require('../utils/paths');

const tsconfig = fs.readJSONSync(paths.root.tsconfig);

const packages = readPackageInfos({ portalFirst: false });

tsconfig.compilerOptions.paths = {};
tsconfig.references = [];

packages.forEach(({ directoryName }) => {
  tsconfig.compilerOptions.paths[`@/${directoryName}/*`] = [
    `./packages/${directoryName}/src/*`,
  ];
  tsconfig.references.push({
    path: `./packages/${directoryName}/`,
  });
});

fs.writeJSONSync(paths.root.tsconfig, tsconfig);

shell.exec(`prettier --write ${paths.root.tsconfig}`);

logger.info('\ninit root tsconfig.json: DONE');
