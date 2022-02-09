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
  const choices = canRunPackages.map(({ packageJson }) => {
    const { name } = packageJson;
    return name;
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
    const packageName = value.trim();
    return { packageName };
  });
}

module.exports = prompt;
