const path = require('path');

const config = require('config');
const fs = require('fs-extra');
const _ = require('lodash');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const tkeelVersion = config.get('tkeel.version');
const jsonTemplateFileNames = [
  { fileName: 'identify.json', dataPath: 'plugin.identify' },
];
const jsonFileNames = [
  'status.json',
  'tenant.enable.json',
  'tenant.disable.json',
];
const jsonSrcDirectoryPath = paths.resolveRoot('scripts/docker/templates/');
const jsonDestDirectoryPath = paths.resolveRoot('.tmp/server/api/');

function createJsonFiles(packageInfo) {
  const { packageJson, config: packageConfig } = packageInfo;
  const { version } = packageJson;

  jsonTemplateFileNames.forEach(({ fileName, dataPath }) => {
    const srcPath = path.resolve(jsonSrcDirectoryPath, fileName);
    const destPath = path.resolve(jsonDestDirectoryPath, fileName);
    const content = fs.readJsonSync(srcPath);
    const response = _.merge(
      {},
      content,
      { version, tkeel_version: tkeelVersion },
      _.get(packageConfig, dataPath)
    );
    fs.outputJSONSync(destPath, response);
  });

  jsonFileNames.forEach((fileName) => {
    const srcPath = path.resolve(jsonSrcDirectoryPath, fileName);
    const destPath = path.resolve(jsonDestDirectoryPath, fileName);
    fs.copyFileSync(srcPath, destPath);
  });

  logger.success('created json files\n');
}

function deleteJsonFiles() {
  [...jsonTemplateFileNames, ...jsonFileNames].forEach((fileName) => {
    const destPath = path.resolve(jsonDestDirectoryPath, fileName);
    fs.removeSync(destPath);
  });
  logger.success('deleted json files\n');
}

module.exports = { createJsonFiles, deleteJsonFiles };
