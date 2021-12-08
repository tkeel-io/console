const concurrently = require('concurrently');

const { fetchPackageNames } = require('../utils/packages');
const logger = require('../utils/logger');

async function run({ directoryNames, npmScriptName }) {
  try {
    const packagesNames = await fetchPackageNames({ directoryNames });
    const commands = packagesNames.map((name) => {
      const command = `yarn workspace ${name} run ${npmScriptName}`;
      logger.info(command);
      return { command, name };
    });
    concurrently(commands);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = { run };
