const concurrently = require('concurrently');

const { getPackages } = require('../utils/packages');
const logger = require('../utils/logger');

function getCommandInfo({ packageName, npmScriptName }) {
  const command = `yarn workspace ${packageName} run ${npmScriptName}`;
  return { command, name: packageName };
}

function run({ directoryNames, npmScriptName }) {
  const packageNames = getPackages({ directoryNames }).map(
    ({ packageJson }) => packageJson.name
  );
  const commands = packageNames.map((name) => {
    const info = getCommandInfo({ packageName: name, npmScriptName });
    logger.info(info.command);
    return info;
  });
  concurrently(commands);
}

module.exports = { run };
