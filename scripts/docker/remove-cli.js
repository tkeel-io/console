#!/usr/bin/env node

const shell = require('shelljs');

const prompt = require('./prompt');

(async () => {
  const infos = await prompt();
  infos.forEach(({ ID }) => {
    const command = `docker image rm ${ID}`;
    shell.exec(command);
  });
})();
