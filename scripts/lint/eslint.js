const shell = require('shelljs');
const path = require('path');
const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

packageInfos.forEach(({ absolutePath }) => {
  const files = path.resolve(absolutePath, '**/*.{js,ts,tsx}');
  const configFile = path.resolve(absolutePath, '.eslintrc.js');
  const command = `cd ${absolutePath} && npx eslint --config ${configFile} --fix ${files}`;
  logger.info(command);
  shell.exec(command);
});
