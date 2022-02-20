module.exports = {
  version: '0.2',
  language: 'en',
  ignorePaths: [
    '**/.idea/**',
    '**/.vscode/**',
    '**/.gitattributes',
    '**/.gitignore',
    '**/Dockerfile',
    '**/.dockerignore',
    '**/package.json',
    '**/yarn.json',
    '**/*.svg',
    '**/dist/**',
    './docker/',
    './charts/',
  ],
  dictionaries: ['custom'],
  dictionaryDefinitions: [
    { name: 'custom', path: './dictionaries/custom.dic' },
  ],
};
