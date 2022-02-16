const { tkeel } = require('../../../config/default');

module.exports = {
  platformName: 'admin',
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
      plugin_id: 'console-portal-admin',
      dependence: [{ id: 'rudder', version: tkeel.version }],
    },
  },
};
