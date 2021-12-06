const {
  PACKAGE_NAME_PREFIX,
  PLUGIN_PACKAGE_NAME_PREFIX,
} = require('../constants');

function getCommonPackageDirName({ simpleName }) {
  return `${PACKAGE_NAME_PREFIX}${simpleName}`;
}

function getPluginPackageDirName({ simpleName }) {
  return `${PLUGIN_PACKAGE_NAME_PREFIX}${simpleName}`;
}

module.exports = { getCommonPackageDirName, getPluginPackageDirName };
