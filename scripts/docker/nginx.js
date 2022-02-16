const fs = require('fs-extra');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const nginxConfigSrcFilePath = paths.resolveRoot(
  'scripts/docker/templates/nginx.conf'
);
const nginxConfigDestFilePath = paths.resolveRoot('.tmp/nginx.conf');

function createNginxConfigFile() {
  fs.copyFileSync(nginxConfigSrcFilePath, nginxConfigDestFilePath);
  logger.success('created nginx.conf\n');
}

function deleteNginxConfigFile() {
  fs.removeSync(nginxConfigDestFilePath);
  logger.success('deleted nginx.conf\n');
}

module.exports = { createNginxConfigFile, deleteNginxConfigFile };
