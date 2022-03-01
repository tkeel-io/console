const fs = require('fs-extra');
const Handlebars = require('handlebars');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const nginxConfigSrcFilePath = paths.resolveRoot(
  'scripts/docker/handlebars/nginx.conf'
);
const nginxConfigDestFilePath = paths.resolveRoot('.tmp/nginx.conf');

function createNginxConfigFile(packageInfo) {
  const content = fs.readFileSync(nginxConfigSrcFilePath, { encoding: 'utf8' });
  const template = Handlebars.compile(content);
  const data = template(packageInfo);
  fs.outputFileSync(nginxConfigDestFilePath, data);
  logger.success('created nginx.conf\n');
}

function deleteNginxConfigFile() {
  fs.removeSync(nginxConfigDestFilePath);
  logger.success('deleted nginx.conf\n');
}

module.exports = { createNginxConfigFile, deleteNginxConfigFile };
