/* eslint-disable no-console */

const chalk = require('chalk');

function log(...args) {
  console.log(...args);
}

function info(...args) {
  console.info(chalk.blue(...args));
}

function success(...args) {
  console.log(chalk.green(...args));
}

function error(...args) {
  console.info(chalk.red(...args));
}

module.exports = { log, info, success, error };
