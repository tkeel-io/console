const concurrently = require('concurrently');

const { getPackages } = require('../utils/packages');
const logger = require('../utils/logger');

function run({ directoryNames, npmScriptName }) {
  const packageNames = getPackages({ directoryNames }).map(
    ({ packageJson }) => packageJson.name
  );
  const commands = packageNames.map((name) => {
    const command = `yarn workspace ${name} run ${npmScriptName}`;
    logger.info(command);
    return { command, name };
  });
  concurrently(commands);
}

module.exports = { run };
