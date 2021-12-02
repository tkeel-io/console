module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'color-named': ['never', { ignore: ['inside-function'] }],
    'selector-list-comma-space-after': 'always-single-line',
    'no-unknown-animations': true,
  },
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'no-empty-source': null,
        'value-keyword-case': null,
      },
    },
  ],
};
