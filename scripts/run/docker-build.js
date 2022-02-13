#!/usr/bin/env node

const shell = require('shelljs');

const logger = require('../utils/logger');
const prompt = require('./prompt');

function build(packageInfo) {
  const { simpleName, directoryName } = packageInfo;
  const command = `docker build -t=${simpleName} --build-arg DIRECTORY_NAME=${directoryName} .`;
  logger.info(command);
  shell.exec(command);
}

(async () => {
  const packages = await prompt();
  packages.forEach((packageInfo) => build(packageInfo));
})();
