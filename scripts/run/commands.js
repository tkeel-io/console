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
 * @param {Object} data[].env
 * @param {string} data[].env.THEME_NAME
 * @param {string} data[].env.APPEARANCE_NAME
 */
function runNpmScripts({ data }) {
  const commands = data.map(({ packageName, npmScriptName, env }) => {
    const command = `yarn workspace ${packageName} ${npmScriptName}`;
    logger.info(command);
    return { command, name: npmScriptName, env };
  });
  concurrently(commands);
}

module.exports = { runNpmScript, runNpmScripts };
