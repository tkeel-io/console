#!/usr/bin/env node

const shell = require('shelljs');

const logger = require('../utils/logger');
const prompt = require('./prompt');

function build(packageInfo) {
  const { simpleName, packageJson } = packageInfo;
  const { name: packageName } = packageJson;
  const command = `docker build -t=${simpleName} --build-arg PACKAGE_NAME=${packageName} .`;
  logger.info(command);
  shell.exec(command);
}

(async () => {
  const packages = await prompt();
  packages.forEach((packageInfo) => build(packageInfo));
})();
