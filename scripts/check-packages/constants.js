const paths = require('../utils/paths');

const { packages } = paths;

const SHARED = [packages.components, packages.hooks, packages.utils];

const COMMON = [packages.core, ...SHARED];

module.exports = {
  SHARED,
  COMMON,
};
