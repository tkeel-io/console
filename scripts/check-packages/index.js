const fs = require('fs');

const paths = require('../utils/paths');
const {
  PLUGIN_PACKAGE_NAME_PREFIX,
  COMMON_PACKAGE_SIMPLE_NAMES,
} = require('../constants');

const res = fs.readdirSync(paths.packages.self);
const dirs = res.filter((relativePath) => {
  const absolutePath = paths.resolveWithPackages(relativePath);
  const stat = fs.statSync(absolutePath);
  return (
    stat.isDirectory() &&
    !COMMON_PACKAGE_SIMPLE_NAMES.includes(absolutePath) &&
    relativePath.startsWith(PLUGIN_PACKAGE_NAME_PREFIX)
  );
});

console.log(dirs);
