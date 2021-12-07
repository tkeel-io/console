const { checkPluginName } = require('../utils/packages');

console.log(
  checkPluginName({
    simpleName: 'example',
  })
);
