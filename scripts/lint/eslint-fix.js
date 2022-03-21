const path = require('path');
const { readPackageInfos } = require('../utils/packages');
const { runESLint } = require('./exec');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });
const files = '**/*.{js,ts,tsx}';
const isFix = true;

runESLint({ cwd: path.resolve(__dirname, '../..'), files, isFix });

packageInfos.forEach(({ absolutePath }) =>
  runESLint({ cwd: absolutePath, files, isFix })
);
