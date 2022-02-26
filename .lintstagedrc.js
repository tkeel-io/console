module.exports = {
  '*.{js,jsx,ts,tsx,json,hbs,handlebars,css,scss,md,yaml,yml}':
    'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  // '*.{ts,tsx}': 'tsc --noEmit',
  '*.{css,scss,js,jsx,ts,tsx}': 'stylelint --fix',
  '**': 'cspell --no-must-find-files',
};
