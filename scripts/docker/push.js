const shell = require('shelljs');

const { selectCanRunPackages } = require('../utils/packages');
const setChartVersions = require('./set-chart-versions');

(async () => {
  const infos = await selectCanRunPackages();
  infos.forEach(({ name }) => {
    const command = `docker image push ${name}`;
    shell.exec(command);
  });
  setChartVersions(infos);
})();
