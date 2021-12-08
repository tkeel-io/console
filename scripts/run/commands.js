const concurrently = require('concurrently');

const { getPackages } = require('../utils/packages');
const logger = require('../utils/logger');

function run({ directoryNames, npmScriptName }) {
  const packagesNames = getPackages({ directoryNames }).map(
    ({ packageJson }) => packageJson.name
  );
  const commands = packagesNames.map((name) => {
    const command = `yarn workspace ${name} run ${npmScriptName}`;
    logger.info(command);
    return { command, name };
  });
  concurrently(commands);
}

module.exports = { run };
