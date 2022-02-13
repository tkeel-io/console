const fs = require('fs-extra');
const Handlebars = require('handlebars');
const shell = require('shelljs');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const nginxConfigTemplatePath = paths.resolveRoot(
  'scripts/docker/handlebars/nginx.conf'
);
const nginxConfigPath = paths.resolveRoot('.tmp/nginx.conf');

function build(packageInfo) {
  const { simpleName, directoryName, config } = packageInfo;
  const nginxConfigTemplate = fs.readFileSync(nginxConfigTemplatePath, {
    encoding: 'utf8',
  });
  const template = Handlebars.compile(nginxConfigTemplate);
  const context = {
    api: {
      pathname: config.api.pathname,
      origin: config.api.port
        ? `${config.api.protocol}://${config.api.hostname}:${config.api.port}`
        : `${config.api.protocol}://${config.api.hostname}`,
    },
    response: JSON.stringify({ a: 1, b: 2 }),
  };
  const nginxConfig = template(context);
  logger.info('nginx.conf\n');
  logger.info(nginxConfig);
  fs.outputFileSync(nginxConfigPath, nginxConfig);
  logger.success('created nginx.conf');

  const command = `docker build -t=${simpleName} --build-arg DIRECTORY_NAME=${directoryName} .`;
  logger.info(command);
  shell.exec(command);
  logger.success('docker build success');

  fs.removeSync(nginxConfigPath);
  logger.success('deleted nginx.conf');
}

module.exports = build;
