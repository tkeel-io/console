const inquirer = require('inquirer');

const { readPackages } = require('../utils/packages');

const connector = ' - ';

/**
 *
 * @param {string} npmScriptName
 * @returns {Promise<Object[]>}
 */
async function prompt({ npmScriptName }) {
  const message = 'Select packages';
  const packages = readPackages();
  const canRunPackages = packages.filter(({ canRun }) => canRun);
  const choices = canRunPackages.map(({ packageJson }) => {
    const { name } = packageJson;
    return `${name}${connector}${npmScriptName}`;
  });

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
