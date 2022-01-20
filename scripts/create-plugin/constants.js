const OPTIONS_MAP = Object.freeze({
  name: {
    desc: 'plugin name',
    errorMessage: 'Please input a name.',
  },
  basePath: {
    desc: 'plugin base path',
    errorMessage: 'Please input a base path.',
  },
  serverPort: {
    desc: 'server port',
    errorMessage: 'Please input a port.',
  },
});

module.exports = { OPTIONS_MAP };
