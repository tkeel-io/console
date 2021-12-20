const inquirer = require('inquirer');
const _ = require('lodash');
const { isPort } = require('validator');

const { PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX } = require('../constants');
const { OPTIONS_MAP } = require('./constants');
const {
  checkPluginName,
  checkPluginBasePath,
  checkPluginDevServerPort,
} = require('../utils/packages');

async function prompt({ argv }) {
  const { name, basePath, devServerPort } = argv;
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
        return `${PLUGIN_PACKAGE_DIRECTORY_NAME_PREFIX}${value}`;
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

        const { flag, message } = checkPluginBasePath({ basePath: value });
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

  if (!isPort(String(devServerPort))) {
    questions.push({
      type: 'input',
      name: 'devServerPort',
      message: OPTIONS_MAP.devServerPort.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.devServerPort.errorMessage;
        }

        const { flag, message } = checkPluginDevServerPort({
          devServerPort: value,
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

  const answers = await inquirer.prompt(questions);

  return answers;
}

module.exports = prompt;
