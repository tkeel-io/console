const shell = require('shelljs');

const { getSelectedCanRunPackageInfos } = require('../utils/packages');

(async () => {
  const packageInfos = await getSelectedCanRunPackageInfos();
  packageInfos.forEach(({ ID }) => {
    const command = `docker image rm ${ID}`;
    shell.exec(command);
  });
})();
