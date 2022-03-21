module.exports = {
  extends: [
    './base/base',
    './base/typescript-base',
    'plugin:prettier/recommended',
  ],
};

const { merge } = require('webpack-merge');

const base = require('./base/base');
const prettier = require('./base/prettier-base');
const typescript = require('./base/typescript-base');

module.exports = merge({}, base, typescript, prettier);
