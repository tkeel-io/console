const shell = require('shelljs');
// const path = require('path');
const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

packageInfos.forEach(({ absolutePath }) => {
  const files = '**/*.{js,ts,tsx}';
  const command = `npx eslint --ignore-pattern "**/dist" "${files}"`;
  shell.cd(absolutePath);
  logger.info(process.cwd(), command);
  shell.exec(command);
});
