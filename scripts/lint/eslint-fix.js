const path = require('path');

const { readPackageInfos } = require('../utils/packages');
const { runESLint } = require('./exec');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });
const isFix = true;

runESLint({
  cwd: path.resolve(__dirname, '../..'),
  files: '**/*.{js,ts}',
  isFix,
});

packageInfos.forEach(({ absolutePath }) =>
  runESLint({ cwd: absolutePath, files: '**/*.{js,ts,tsx}', isFix })
);
