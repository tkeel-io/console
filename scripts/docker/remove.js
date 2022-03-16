const shell = require('shelljs');

const { selectCanRunPackages } = require('../utils/packages');

(async () => {
  const infos = await selectCanRunPackages();
  infos.forEach(({ ID }) => {
    const command = `docker image rm ${ID}`;
    shell.exec(command);
  });
})();
