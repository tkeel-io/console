const path = require('path');

const config = require('config');
const _ = require('lodash');
const writePackage = require('write-pkg');

const consoleVersion = config.get('tkeel.console.version');

const { readPackageInfos } = require('../utils/packages');

async function setAllPackagesVersion(version) {
  const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

  packageInfos.forEach(({ absolutePath, packageJson }) => {
    writePackage.sync(
      path.resolve(absolutePath, 'package.json'),
      _.merge({}, packageJson, {
        version,
      })
    );
  });
}

setAllPackagesVersion(consoleVersion);
