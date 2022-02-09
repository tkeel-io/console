const inquirer = require('inquirer');

const { readPackages } = require('../utils/packages');

/**
 *
 * @returns {Promise<Object[]>}
 */
async function prompt() {
  const message = 'Select packages';
  const packages = readPackages();
  const canRunPackages = packages.filter(({ canRun }) => canRun);
  const choices = canRunPackages.map((packageInfo) => {
    const { packageJson } = packageInfo;
    const { name } = packageJson;
    return { name, value: packageInfo };
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

  return data;
}

module.exports = prompt;
