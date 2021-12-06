const fs = require('fs');

const paths = require('../utils/paths');
const { COMMON } = require('./constants');

const res = fs.readdirSync(paths.packages.self);
const dirs = res.filter((relativePath) => {
  const absolutePath = paths.resolveWithPackages(relativePath);
  const stat = fs.statSync(absolutePath);
  return (
    stat.isDirectory() &&
    !COMMON.includes(absolutePath) &&
    relativePath.startsWith('tkeel-console-plugin-')
  );
});

console.log(dirs);
