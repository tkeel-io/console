const shell = require('shelljs');

const prompt = require('./prompt');

(async () => {
  const infos = await prompt();
  infos.forEach(({ name }) => {
    const command = `docker image push ${name}`;
    shell.exec(command);
  });
})();
