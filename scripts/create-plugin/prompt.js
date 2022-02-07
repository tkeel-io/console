const inquirer = require('inquirer');
const _ = require('lodash');
const { isPort } = require('validator');

const { PACKAGES_PREFIX } = require('../constants');
const {
  checkPluginName,
  checkCanRunPackageBasePath,
  checkCanRunPackageServerPort,
} = require('../utils/packages');
const { OPTIONS_MAP } = require('./constants');

// eslint-disable-next-line sonarjs/cognitive-complexity
async function prompt({ argv }) {
  const { name, basePath, serverPort } = argv;
  const questions = [];

  if (!_.isString(name)) {
    questions.push({
      type: 'input',
      name: 'name',
      message: OPTIONS_MAP.name.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.name.errorMessage;
        }

        const { flag, message } = checkPluginName({ pluginName: value });
        if (!flag) {
          return message;
        }

        return true;
      },
      filter(value) {
        return value.trim();
      },
      transformer(value) {
        return `${PACKAGES_PREFIX.pluginDirectoryName}${value}`;
      },
    });
  }

  if (!_.isString(basePath)) {
    questions.push({
      type: 'input',
      name: 'basePath',
      message: OPTIONS_MAP.basePath.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.basePath.errorMessage;
        }

        const { flag, message } = checkCanRunPackageBasePath({
          basePath: value,
        });
        if (!flag) {
          return message;
        }

        return true;
      },
      filter(value) {
        return value.trim();
      },
    });
  }

  if (!isPort(String(serverPort))) {
    questions.push({
      type: 'input',
      name: 'serverPort',
      message: OPTIONS_MAP.serverPort.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.serverPort.errorMessage;
        }

        const { flag, message } = checkCanRunPackageServerPort({
          serverPort: value,
        });
        if (!flag) {
          return message;
        }

        return true;
      },
      filter(value) {
        return value.trim();
      },
    });
  }

  if (questions.length === 0) {
    return null;
  }

  // eslint-disable-next-line no-return-await
  return await inquirer.prompt(questions);
}

module.exports = prompt;
