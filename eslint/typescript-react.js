const { merge } = require('webpack-merge');

const base = require('./base/base');
const prettier = require('./base/prettier-base');
const react = require('./base/react-base');
const typescript = require('./base/typescript-base');

module.exports = merge({}, base, react, typescript, prettier);
