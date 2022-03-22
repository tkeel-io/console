const { merge } = require('webpack-merge');

const base = require('./base/base');
const javascript = require('./base/javascript-base');
const prettier = require('./base/prettier-base');

module.exports = merge({}, base, javascript, prettier);
