const _ = require('lodash');

const { readPackageInfos } = require('./scripts/utils/packages');

const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

function getPackageNameByFilePath(filePath) {
  const packageInfo = _.find(packageInfos, (info) => {
    const { absolutePath } = info;
    return filePath.startsWith(absolutePath);
  });

  if (packageInfo) {
    return packageInfo.packageJson.name;
  }
  return 'root';
}

module.exports = {
  '*.{js,jsx,ts,tsx,json,hbs,handlebars,css,scss,md,yaml,yml}':
    'prettier --write',
  '*.{js,ts,tsx}': (files) => {
    const data = files.map((filePath) => ({
      packageName: getPackageNameByFilePath(filePath),
      filePath,
    }));
    const map = {};
    data.forEach(({ packageName, filePath }) => {
      const isInMap = packageName in map;
      if (isInMap) {
        map[packageName].push(filePath);
      } else {
        map[packageName] = [filePath];
      }
    });
    const commands = Object.entries(map).map(([packageName, filePaths]) => {
      const filePathsString = filePaths.join(' ');
      if (packageName === 'root') {
        return `eslint --fix ${filePathsString}`;
      }
      return `yarn workspace ${packageName} run lint:script --fix ${filePathsString}`;
    });
    return commands.join(' \n ');
  },
  // '*.{ts,tsx}': 'tsc --noEmit',
  '*.{css,scss,js,jsx,ts,tsx}': 'stylelint --fix',
  '**': 'cspell --no-must-find-files',
};
