/* eslint-disable no-console */

const chalk = require('chalk');

function success(...args) {
  console.log(chalk.green(...args));
}

function info(...args) {
  console.info(chalk.blue(...args));
}

function error(...args) {
  console.info(chalk.red(...args));
}

module.exports = { success, info, error };
