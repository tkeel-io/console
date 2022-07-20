const concurrently = require('concurrently');

const logger = require('../utils/logger');

/**
 *
 * @param {Object} data
 * @param {string} data.packageName
 * @param {string} data.npmScriptName
 * @param {Object} data.env
 * @param {string} data.env.THEME_NAME
 * @param {string} data.env.APPEARANCE_NAME
 */
function runNpmScript({ data }) {
  const { packageName, npmScriptName, env } = data;
  const command = `yarn workspace ${packageName} ${npmScriptName}`;
  logger.info(`${command}\n`);

  concurrently([{ command, name: npmScriptName, env }]);
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
