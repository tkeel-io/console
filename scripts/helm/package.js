const fs = require('fs-extra');
const shell = require('shelljs');

const logger = require('../utils/logger');
const paths = require('../utils/paths');

function getChartAbsolutePaths() {
  const directoryNames = fs.readdirSync(paths.root.charts);
  return directoryNames.map((directoryName) =>
    paths.resolveCharts(directoryName)
  );
}

module.exports = function packageCharts() {
  const absolutePaths = getChartAbsolutePaths();
  absolutePaths.forEach((absolutePath) => {
    const destination = paths.resolveRoot('dist', 'charts');
    const command = `helm package --destination=${destination} ${absolutePath}`;
    logger.info(command);
    shell.exec(command);
  });
};
