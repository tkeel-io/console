const fs = require('fs-extra');
const Handlebars = require('handlebars');
const shell = require('shelljs');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const jsonPath = paths.resolveRoot('.tmp/test.json');
const nginxConfigTemplatePath = paths.resolveRoot(
  'scripts/docker/handlebars/nginx.conf'
);
const nginxConfigTemplate = fs.readFileSync(nginxConfigTemplatePath, {
  encoding: 'utf8',
});
const nginxConfigPath = paths.resolveRoot('.tmp/nginx.conf');

function createJson(packageInfo) {
  const { config } = packageInfo;
  logger.info('json\n');
  logger.info(`${JSON.stringify(config)}\n`);
  fs.outputJsonSync(jsonPath, config);
  logger.success('created json\n');
}

function createNginxConfig(packageInfo) {
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
  fs.outputFileSync(nginxConfigPath, nginxConfig);
  logger.success('created nginx.conf\n');
}

function execCommand(packageInfo) {
  const { simpleName, directoryName, packageJson } = packageInfo;
  const { name: packageName } = packageJson;
  const command = `docker build -t=${simpleName} --build-arg DIRECTORY_NAME=${directoryName} --build-arg PACKAGE_NAME=${packageName} .`;
  logger.info(`${command}\n`);
  shell.exec(command);
  logger.success('docker build success\n');
}

function deleteJson() {
  fs.removeSync(jsonPath);
  logger.success('deleted json\n');
}

function deleteNginxConfig() {
  fs.removeSync(nginxConfigPath);
  logger.success('deleted nginx.conf\n');
}

function build(packageInfo) {
  createJson(packageInfo);
  createNginxConfig(packageInfo);
  execCommand(packageInfo);
  deleteJson();
  deleteNginxConfig();
}

module.exports = build;
