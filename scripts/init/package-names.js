#!/usr/bin/env node

const path = require('path');

const fs = require('fs-extra');
const _ = require('lodash');
const shell = require('shelljs');
const writePackage = require('write-pkg');

const { readPackages } = require('../utils/packages');
const logger = require('../utils/logger');

const packages = readPackages({ portalFirst: false });

packages.forEach(({ directoryName, absolutePath }) => {
  const [scope, ...rest] = directoryName.split('-');
  const correctPackageName = `@${scope}/${rest.join('-')}`;

  const packageJsonPath = path.resolve(absolutePath, 'package.json');
  const ReadMePath = path.resolve(absolutePath, 'README.md');
  const packageJson = fs.readJsonSync(packageJsonPath);

  writePackage.sync(
    path.resolve(absolutePath, 'package.json'),
    _.merge({}, packageJson, {
      name: correctPackageName,
    })
  );

  fs.writeFileSync(
    path.resolve(absolutePath, 'README.MD'),
    `# ${correctPackageName}`
  );

  shell.exec(`prettier --write ${packageJsonPath} ${ReadMePath}`);
});

logger.info('\ninit package name: DONE');
