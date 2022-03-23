#!/usr/bin/env node

const prompt = require('./prompt');
const push = require('./push');

(async () => {
  const infos = await prompt();
  infos.forEach(({ Repository, Tag }) => {
    const packageInfo = {
      docker: {
        imageName: Repository,
        imageTag: Tag,
      },
    };
    push(packageInfo);
  });
})();
