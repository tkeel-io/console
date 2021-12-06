const inquirer = require('inquirer');
const { isString } = require('lodash');
const { isPort } = require('validator');

const { PLUGIN_PACKAGE_NAME_PREFIX } = require('../constants');
const { OPTIONS_MAP } = require('./constants');
const { checkName, checkBasePath, checkPort } = require('../utils/packages');

async function prompt({ argv }) {
  const { name, basePath, port } = argv;
  const questions = [];

  if (!isString(name)) {
    questions.push({
      type: 'input',
      name: 'name',
      message: OPTIONS_MAP.name.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.name.errorMessage;
        }

        const { flag, message } = checkName({ simpleName: value });
        if (!flag) {
          return message;
        }

        return true;
      },
      filter(value) {
        return value.trim();
      },
      transformer(value) {
        return `${PLUGIN_PACKAGE_NAME_PREFIX}${value}`;
      },
    });
  }

  if (!isString(basePath)) {
    questions.push({
      type: 'input',
      name: 'basePath',
      message: OPTIONS_MAP.basePath.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.basePath.errorMessage;
        }

        const { flag, message } = checkBasePath({ basePath: value });
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

  if (!isPort(String(port))) {
    questions.push({
      type: 'input',
      name: 'port',
      message: OPTIONS_MAP.port.desc,
      validate(value) {
        if (!value.trim()) {
          return OPTIONS_MAP.port.errorMessage;
        }

        const { flag, message } = checkPort({ port: value });
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
