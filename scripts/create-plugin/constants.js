const OPTIONS_MAP = {
  name: {
    desc: 'plugin name',
    errorMessage: 'Please input a name.',
  },
  basePath: {
    desc: 'plugin BASE_PATH',
    errorMessage: 'Please input a BASE_PATH.',
  },
  port: {
    desc: 'devServer port',
    errorMessage: 'Please input a port.',
  },
};

Object.freeze(OPTIONS_MAP);

const NAME_PREFIX = 'tkeel-console-plugin-';

module.exports = { OPTIONS_MAP, NAME_PREFIX };
