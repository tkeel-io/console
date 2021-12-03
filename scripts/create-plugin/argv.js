const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { OPTIONS_MAP } = require('./constants');

function getArgv() {
  const { argv } = yargs(hideBin(process.argv))
    .options({
      n: {
        alias: 'name',
        type: 'string',
        desc: OPTIONS_MAP.name.desc,
      },
      bs: {
        alias: 'base-path',
        type: 'string',
        desc: OPTIONS_MAP.basePath.desc,
      },
      p: {
        alias: 'port',
        type: 'number',
        desc: OPTIONS_MAP.port.desc,
      },
    })
    .help()
    .alias('h', 'help')
    .version()
    .alias('v', 'version');

  return argv;
}

module.exports = { getArgv };
