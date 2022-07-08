const path = require('node:path');

const fs = require('fs-extra');
const yaml = require('js-yaml');
const _ = require('lodash');

const paths = require('../utils/paths');

const chartsDirectoryPath = paths.resolveRoot('charts');
const files = [
  { path: 'Chart.yaml', valuePath: 'version' },
  { path: 'values.yaml', valuePath: 'image.tag' },
];

function getDirectoryNameByDockerRepository(repository = '') {
  return repository.replace(/^tkeelio\//, '');
}

module.exports = async function setChartVersions(imageInfos) {
  imageInfos.forEach(({ Repository, Tag }) => {
    const directoryName = getDirectoryNameByDockerRepository(Repository);
    const directoryPath = path.resolve(chartsDirectoryPath, directoryName);
    const isExists = fs.existsSync(directoryPath);

    if (isExists) {
      files.forEach((file) => {
        const filePath = path.resolve(directoryPath, file.path);
        const yamlContent = fs.readFileSync(filePath);
        const json = yaml.load(yamlContent);
        let obj = null;

        if (file.path === 'Chart.yaml') {
          obj = {
            version: Tag,
          };
        } else if (file.path === 'values.yaml') {
          obj = {
            image: {
              tag: Tag,
            },
          };
        }

        const newJson = _.merge({}, json, obj);
        const newYamlContent = yaml.dump(newJson);
        fs.writeFileSync(filePath, newYamlContent);
      });
    }
  });
};
