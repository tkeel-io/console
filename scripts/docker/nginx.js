const fs = require('fs-extra');
const Handlebars = require('handlebars');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const nginxConfigSrcFilePath = paths.resolveRoot(
  'scripts/docker/handlebars/nginx.conf'
);
const nginxConfigTemplate = fs.readFileSync(nginxConfigSrcFilePath, {
  encoding: 'utf8',
});
const nginxConfigDestFilePath = paths.resolveRoot('.tmp/nginx.conf');

function createNginxConfigFile(packageInfo) {
  const { config } = packageInfo;
  const template = Handlebars.compile(nginxConfigTemplate);
  const context = {
    api: {
      pathname: config.api.pathname,
      origin: config.api.port
        ? `${config.api.protocol}://${config.api.hostname}:${config.api.port}`
        : `${config.api.protocol}://${config.api.hostname}`,
    },
  };
  const nginxConfig = template(context);
  logger.info('nginx.conf\n');
  logger.info(`${nginxConfig}\n`);
  fs.outputFileSync(nginxConfigDestFilePath, nginxConfig);
  logger.success('created nginx.conf\n');
}

function deleteNginxConfigFile() {
  fs.removeSync(nginxConfigDestFilePath);
  logger.success('deleted nginx.conf\n');
}

module.exports = { createNginxConfigFile, deleteNginxConfigFile };
