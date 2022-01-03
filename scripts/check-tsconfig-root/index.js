const fs = require('fs-extra');
const _ = require('lodash');
const shell = require('shelljs');

const { getPackages } = require('../utils/packages');
const { log } = require('../utils/logger');
const paths = require('../utils/paths');

const tsconfig = fs.readJSONSync(paths.root.tsconfig);

const packages = getPackages();
const data = {
  compilerOptions: {
    paths: {},
  },
  references: [],
};

packages.forEach(({ directoryName }) => {
  data.compilerOptions.paths[`@/${directoryName}/*`] = [
    `./packages/${directoryName}/src/*`,
  ];
  data.references.push({
    path: `./packages/${directoryName}/`,
  });
});

const json = _.merge({}, tsconfig, data);

fs.writeJSONSync(paths.root.tsconfig, json);

shell.exec(`prettier --write ${paths.root.tsconfig}`);

log('check root tsconfig.json: DONE');
