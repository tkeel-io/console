const inquirer = require('inquirer');

const { PORTAL_PACKAGE_INFOS } = require('../constants');
const { getPackages } = require('../utils/packages');

const connector = ' - ';

/**
 *
 * @param {string} npmScriptName
 * @returns {Promise<Object[]>}
 */
async function prompt({ npmScriptName }) {
  const packages = getPackages();
  const canRunPackages = packages.filter(({ canRun }) => canRun);
  const portalPackage = canRunPackages.shift();
  canRunPackages.unshift(portalPackage, portalPackage);
  const choices = canRunPackages.map(({ packageJson, isPortal }, index) => {
    const { name } = packageJson;

    if (isPortal && index < PORTAL_PACKAGE_INFOS.length) {
      return `${name} - ${npmScriptName}:${PORTAL_PACKAGE_INFOS[index].platform}`;
    }

    return `${name}${connector}${npmScriptName}`;
  });

  const message = 'Select packages';

  const questions = [
    {
      type: 'checkbox',
      name: 'data',
      message,
      choices,
      validate(value) {
        if (value.length === 0) {
          return `Please ${message}`;
        }
        return true;
      },
    },
  ];

  const { data } = await inquirer.prompt(questions);

  return data.map((value) => {
    const [packageName, scriptName] = value.trim().split(connector);
    return { packageName, npmScriptName: scriptName };
  });
}

module.exports = prompt;
