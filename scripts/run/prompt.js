const inquirer = require('inquirer');

const {
  PACKAGE_NAME_PREFIX,
  CORE_PACKAGE_SIMPLE_NAME,
} = require('../constants');
const { getCanRunPackagesDirNames } = require('../utils/packages');

async function prompt() {
  const dirNames = getCanRunPackagesDirNames();

  const questions = [
    {
      type: 'checkbox',
      name: 'dirNames',
      message: 'Select package directories',
      default: [`${PACKAGE_NAME_PREFIX}${CORE_PACKAGE_SIMPLE_NAME}`],
      choices: dirNames,
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
