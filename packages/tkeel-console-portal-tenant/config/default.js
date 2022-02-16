const { tkeel } = require('../../../config/default');

module.exports = {
  platformName: 'tenant',
  publicPath: '/',
  client: {
    themeName: 'qingcloud-light',
    documentTitle: 'tKeel',
  },
  api: {
    pathname: '/apis',
  },
  plugin: {
    identify: {
      plugin_id: 'console-portal-tenant',
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
