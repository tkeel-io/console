module.exports = {
  '*.{js,jsx,ts,tsx,json,hbs,handlebars,css,scss,md}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
  '*.{css,scss,js,jsx,ts,tsx}': 'stylelint --fix',
  '**': 'cspell --no-must-find-files',
};
