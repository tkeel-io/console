const shell = require('shelljs');

const logger = require('../utils/logger');

module.exports = function push(packageInfo) {
  const { docker } = packageInfo;
  const { imageName, imageTag } = docker;
  const command = `docker image push ${imageName}:${imageTag}`;
  logger.info(`${command}\n`);
  shell.exec(command);
  logger.success('docker push success\n');
};
