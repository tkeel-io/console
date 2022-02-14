const concurrently = require('concurrently');
const shell = require('shelljs');

const logger = require('../utils/logger');

/**
 *
 * @param {Object} data
 * @param {string} data.packageName
 * @param {string} data.npmScriptName
 */
function runNpmScript({ data }) {
  const { packageName, npmScriptName } = data;
  const command = `yarn workspace ${packageName} ${npmScriptName}`;
  logger.info(`${command}\n`);
  shell.exec(command);
}

/**
 *
 * @param {Object[]} data
 * @param {string} data[].packageName
 * @param {string} data[].npmScriptName
 */
function runNpmScripts({ data }) {
  const commands = data.map(({ packageName, npmScriptName }) => {
    const command = `yarn workspace ${packageName} ${npmScriptName}`;
    logger.info(`${command}\n`);
    return { command, name: npmScriptName };
  });
  concurrently(commands);
}

module.exports = { runNpmScript, runNpmScripts };
