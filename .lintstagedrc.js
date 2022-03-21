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
  } else {
    return '';
  }
}

module.exports = {
  '*.{js,jsx,ts,tsx,json,hbs,handlebars,css,scss,md,yaml,yml}':
    'prettier --write',
  '*.{js,ts,tsx}': (files) => {
    const packageNames = files.map((filePath) =>
      getPackageNameByFilePath(filePath)
    );
    const uniqPackageNames = _.uniq(packageNames);
    const commands = uniqPackageNames.map((packageName) => {
      if (packageName) {
        return `yarn workspace ${packageName} run lint:script:fix`;
      } else {
        return 'eslint --fix "**/*.{js,ts}"';
      }
    });
    return commands;
  },
  // '*.{ts,tsx}': 'tsc --noEmit',
  '*.{css,scss,js,jsx,ts,tsx}': 'stylelint --fix',
  '**': 'cspell --no-must-find-files',
};
