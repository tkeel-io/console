const concurrently = require('concurrently');

const paths = require('../utils/paths');
const { readPackages } = require('../utils/packages');
const logger = require('../utils/logger');

async function getPackagesNames({ dirNames }) {
  const pathList = dirNames.map((dirName) => paths.resolvePackages(dirName));
  const data = await readPackages({ paths: pathList });

  return data.map(({ name }) => name);
}

async function run({ dirNames, npmScriptName }) {
  try {
    const packagesNames = await getPackagesNames({ dirNames });
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
