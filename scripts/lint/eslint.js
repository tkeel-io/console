const path = require('path');

const { readPackageInfos } = require('../utils/packages');
const { runESLint } = require('./exec');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

runESLint({ cwd: path.resolve(__dirname, '../..'), files: '**/*.{js,ts}' });

packageInfos.forEach(({ absolutePath }) =>
  runESLint({ cwd: absolutePath, files: '**/*.{js,ts,tsx}' })
);
