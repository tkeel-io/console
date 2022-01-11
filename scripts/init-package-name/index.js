#!/usr/bin/env node

const path = require('path');

const shell = require('shelljs');
const fs = require('fs-extra');
const writePackage = require('write-pkg');

const { readPackages } = require('../utils/packages');
const { log } = require('../utils/logger');

const packages = readPackages({ portalFirst: false });

packages.forEach(({ directoryName, absolutePath }) => {
  const [scope, ...rest] = directoryName.split('-');
  const correctPackageName = `@${scope}/${rest.join('-')}`;

  const packageJsonPath = path.resolve(absolutePath, 'package.json');
  const ReadMePath = path.resolve(absolutePath, 'README.md');

  writePackage.sync(path.resolve(absolutePath, 'package.json'), {
    name: correctPackageName,
  });

  fs.writeFileSync(
    path.resolve(absolutePath, 'README.MD'),
    `# ${correctPackageName}`
  );

  shell.exec(`prettier --write ${packageJsonPath} ${ReadMePath}`);
});

log('init package name: DONE');
