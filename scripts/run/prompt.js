const inquirer = require('inquirer');

const { getCanRunPackageDirectoryNames } = require('../utils/packages');

async function prompt({ defaults = [] } = {}) {
  const directoryNames = getCanRunPackageDirectoryNames();
  const message = 'Select packages (directories)';

  const questions = [
    {
      type: 'checkbox',
      name: 'directoryNames',
      message,
      default: defaults,
      choices: directoryNames,
      validate(value) {
        if (value.length === 0) {
          return `Please ${message}`;
        }
        return true;
      },
    },
  ];

  const answers = await inquirer.prompt(questions);

  return answers;
}

module.exports = prompt;
