const concurrently = require('concurrently');

const logger = require('../utils/logger');

/**
 *
 * @param {Object[]} data
 * @param {string} data[].packageName
 * @param {string} data[].npmScriptName
 */
function runNpmScripts({ data }) {
  const commands = data.map(({ packageName, npmScriptName }) => {
    const command = `yarn workspace ${packageName} ${npmScriptName}`;
    logger.info(command);
    return { command, name: npmScriptName };
  });
  concurrently(commands);
}

module.exports = { runNpmScripts };
