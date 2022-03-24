const chalk = require('chalk');

function log(...args) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

function info(...args) {
  // eslint-disable-next-line no-console
  console.info(chalk.blue(...args));
}

function success(...args) {
  // eslint-disable-next-line no-console
  console.log(chalk.green(...args));
}

function error(...args) {
  // eslint-disable-next-line no-console
  console.info(chalk.red(...args));
}

module.exports = { log, info, success, error };
