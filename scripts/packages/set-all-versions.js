const path = require('path');

const config = require('config');
const fs = require('fs-extra');
const _ = require('lodash');
const writePackage = require('write-pkg');

const consoleVersion = config.tkeel.console.version;

const { readPackageInfos } = require('../utils/packages');

async function setAllPackagesVersion(version) {
  const packageInfos = readPackageInfos({ excludeDirectoryNames: [] });

  packageInfos.forEach(({ absolutePath }) => {
    const destPath = path.resolve(absolutePath, 'package.json');
    const original = fs.readJSONSync(destPath);
    const data = _.merge({}, original, {
      version,
    });
    writePackage.sync(destPath, data);
  });
}

setAllPackagesVersion(consoleVersion);
