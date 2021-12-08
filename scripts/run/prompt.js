const inquirer = require('inquirer');

const {
  PACKAGE_NAME_PREFIX,
  CORE_PACKAGE_SIMPLE_NAME,
} = require('../constants');
const { getCanRunPackageDirectoryNames } = require('../utils/packages');

async function prompt() {
  const directoryNames = getCanRunPackageDirectoryNames();

  const questions = [
    {
      type: 'checkbox',
      name: 'directoryNames',
      message: 'Select package directories',
      default: [`${PACKAGE_NAME_PREFIX}${CORE_PACKAGE_SIMPLE_NAME}`],
      choices: directoryNames,
      validate(value) {
        if (value.length === 0) {
          return 'Please select package directories';
        }
        return true;
      },
    },
  ];

  const answers = await inquirer.prompt(questions);

  return answers;
}

module.exports = prompt;
