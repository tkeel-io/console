// const shell = require('shelljs');

const prompt = require('./prompt');
const setChartVersions = require('./set-chart-versions');

(async () => {
  const infos = await prompt();
  setChartVersions(infos);
  /* infos.forEach(({ name }) => {
    const command = `docker image push ${name}`;

    shell.exec(command);
  }); */
})();
