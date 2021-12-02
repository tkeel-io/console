module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
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
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'no-empty-source': null,
        'value-keyword-case': null,
      },
    },
  ],
};
