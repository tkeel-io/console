const path = require('node:path');

const shell = require('shelljs');

const logger = require('../utils/logger');
const { readPackageInfos } = require('../utils/packages');

function runESLint({ cwd, files, isFix }) {
  const command = `npx eslint${isFix ? ' --fix' : ''} "${files}"`;
  logger.info(`cd ${cwd}`);
  shell.cd(cwd);
  logger.info(command);
  const result = shell.exec(command);
  logger.info('\n');

  return result;
}

function runESLintAllFiles({ isFix } = {}) {
  const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

  const results = [];

  const { stdout: rootStdout } = runESLint({
    cwd: path.resolve(__dirname, '../..'),
    files: '**/*.{js,ts}',
    isFix,
  });
  if (rootStdout) {
    results.push(rootStdout);
  }

  packageInfos.forEach(({ absolutePath }) => {
    const { stdout } = runESLint({
      cwd: absolutePath,
      files: '**/*.{js,ts,tsx}',
      isFix,
    });
    if (stdout) {
      results.push(stdout);
    }
  });

  return results;
}

module.exports = { runESLint, runESLintAllFiles };
