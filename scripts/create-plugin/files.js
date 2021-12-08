const path = require('path');

const fs = require('fs-extra');
const Handlebars = require('handlebars');

const paths = require('../utils/paths');
const { getPluginPackageDirectoryName } = require('../utils/packages');

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
  const files = ['.env', '.env.development', 'package.json', 'README.md'];

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
