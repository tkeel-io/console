const OPTIONS_MAP = Object.freeze({
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
});

module.exports = { OPTIONS_MAP };
