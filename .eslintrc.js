const path = require('path');

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    'shared-node-browser': true,
    amd: true,
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'context',
          'req',
          'request',
          'res',
          'response',
          '$scope',
          'staticContext',
          'draft',
        ],
      },
    ],
    'no-useless-call': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        'newlines-between': 'always',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: path.resolve(__dirname, 'packages/*/tsconfig.json'),
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['packages/*/src/**/*.{js,jsx,ts,tsx}'],
      plugins: ['simple-import-sort'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^prop-types', '^@?\\w'],
              [
                '^(@/(constants|containers|components|routes|pages|hooks|contexts|api|services|utils))(/.*|$)',
              ],
              ['^\\.', '^\\u0000'],
              [
                '^(@/styles)(/.*|$)',
                '^.+\\.module.s?css$',
                '^.+\\.s?css$',
                '^(@/assets)(/.*|$)',
              ],
            ],
          },
        ],
      },
    },
    {
      files: ['!(packages/*/src/**/*.{js,jsx,ts,tsx})'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
