const shell = require('shelljs');

function getImageInfos() {
  const raw = shell
    .exec('docker image ls --format "{{json . }}"', {
      silent: true,
    })
    .stdout.trim();
  const list = raw.split('\n');
  const imageInfos = list.map((json) => JSON.parse(json));
  return imageInfos.filter((imageInfo) => {
    const repository = imageInfo.Repository;
    return repository.startsWith('tkeelio/console');
  });
}

module.exports = { getImageInfos };
