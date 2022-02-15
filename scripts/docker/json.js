const path = require('path');

const fs = require('fs-extra');
const _ = require('lodash');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

const jsonTemplateFileNames = ['identify.json'];
const jsonFileNames = [
  'status.json',
  'tenant.enable.json',
  'tenant.disable.json',
];
const jsonSrcDirectoryPath = paths.resolveRoot('scripts/docker/templates/');
const jsonDestDirectoryPath = paths.resolveRoot('.tmp/api-json/');

function createJsonFiles(packageInfo) {
  const { config, isPortal } = packageInfo;

  if (isPortal) {
    fs.ensureDirSync(jsonDestDirectoryPath);
    return;
  }

  jsonTemplateFileNames.forEach((fileName) => {
    const srcPath = path.resolve(jsonSrcDirectoryPath, fileName);
    const destPath = path.resolve(jsonDestDirectoryPath, fileName);
    const content = fs.readJsonSync(srcPath);
    const response = _.merge({}, content, config);
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
  /* [...jsonTemplateFileNames, ...jsonFileNames].forEach((fileName) => {
    const destPath = path.resolve(jsonDestDirectoryPath, fileName);
    fs.removeSync(destPath);
  }); */

  logger.success('deleted json files\n');
}

module.exports = { createJsonFiles, deleteJsonFiles };
