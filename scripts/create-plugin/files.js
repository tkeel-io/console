const path = require('path');

const fs = require('fs-extra');
const Handlebars = require('handlebars');

const { getPluginPackageDirectoryName } = require('../utils/packages');
const paths = require('../utils/paths');

function copyTemplates(options) {
  const { name } = options;
  const directoryName = getPluginPackageDirectoryName({ pluginName: name });
  const pluginAbsolutePath = paths.resolvePackages(directoryName);
  fs.ensureDirSync(pluginAbsolutePath);
  fs.copySync(path.resolve(__dirname, 'template'), pluginAbsolutePath, {
    overwrite: false,
  });
}

function writeTemplates(options) {
  const { name } = options;
  const directoryName = getPluginPackageDirectoryName({ pluginName: name });
  const pluginAbsolutePath = paths.resolvePackages(directoryName);

  const handlebarsAbsolutePath = path.resolve(__dirname, 'handlebars');
  const files = ['package.json', 'README.md', 'config/default.js'];

  files.forEach((file) => {
    const absolutePath = path.resolve(handlebarsAbsolutePath, file);
    const destAbsolutePath = path.resolve(pluginAbsolutePath, file);
    const content = fs.readFileSync(absolutePath, { encoding: 'utf8' });
    const template = Handlebars.compile(content);
    const data = template(options);

    fs.outputFileSync(destAbsolutePath, data);
  });
}

module.exports = { copyTemplates, writeTemplates };
