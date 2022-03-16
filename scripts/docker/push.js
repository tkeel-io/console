const shell = require('shelljs');

const { getSelectedCanRunPackageInfos } = require('../utils/packages');
const setChartVersions = require('./set-chart-versions');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  packageInfos.forEach(({ name }) => {
    const command = `docker image push ${name}`;
    shell.exec(command);
  });
  setChartVersions(packageInfos);
})();
