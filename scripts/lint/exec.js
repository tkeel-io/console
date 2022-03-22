const shell = require('shelljs');

const logger = require('../utils/logger');

function runESLint({ cwd, files, isFix }) {
  const command = `npx eslint${isFix ? ' --fix' : ''} "${files}"`;
  logger.info(`cd ${cwd}`);
  shell.cd(cwd);
  logger.info(command);
  shell.exec(command);
  logger.info();
}

module.exports = { runESLint };
