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
  const portalName = name.split('-')[0] === 'admin' ? 'admin' : 'tenant';
  const portalValue = portalName === 'admin' ? 0 : 1;
  const directoryName = getPluginPackageDirectoryName({ pluginName: name });
  const pluginAbsolutePath = paths.resolvePackages(directoryName);

  const handlebarsAbsolutePath = path.resolve(__dirname, 'handlebars');
  const files = ['package.json', 'README.md', 'config/default.js'];

  files.forEach((file) => {
    const absolutePath = path.resolve(handlebarsAbsolutePath, file);
    const destAbsolutePath = path.resolve(pluginAbsolutePath, file);
    const content = fs.readFileSync(absolutePath, { encoding: 'utf8' });
    const template = Handlebars.compile(content);
    const data = template({ ...options, portalName, portalValue });

    fs.outputFileSync(destAbsolutePath, data);
  });
}

function createFiles(options) {
  const { name } = options;
  const directoryName = getPluginPackageDirectoryName({ pluginName: name });
  const pluginAbsolutePath = paths.resolvePackages(directoryName);

  const fileName = '.lintstagedrc.js';
  const data = `const config = require('../../.lintstagedrc.js');

module.exports = config;
  `;
  const destAbsolutePath = path.resolve(pluginAbsolutePath, fileName);

  fs.outputFileSync(destAbsolutePath, data);
}

module.exports = { copyTemplates, writeTemplates, createFiles };
