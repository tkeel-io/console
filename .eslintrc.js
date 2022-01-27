const path = require('path');

const { isEnvDevelopment } = require('./scripts/utils/env');

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
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': isEnvDevelopment ? 'warn' : 'error',
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
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__POWERED_BY_QIANKUN__',
          '__INJECTED_PUBLIC_PATH_BY_QIANKUN__',
        ],
      },
    ],
    'import/no-duplicates': ['error', { considerQueryString: true }],
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
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': [
      'error',
      { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
    ],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
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
                '^(@/tkeel-console-portal-base/(types|constants|containers|components|routes|pages|hooks|contexts|utils|apis|services|styles|assets))(/.*|$)',
              ],
              [
                '^(@/tkeel-console-plugin-([a-z0-9]+)/(types|constants|containers|components|routes|pages|hooks|contexts|utils|apis|services|styles|assets))(/.*|$)',
              ],
              [
                '^(@/tkeel-console-(types|themes|components|business-components|icons|hooks|utils))(/.*|$)',
              ],
              ['^\\.', '^\\u0000'],
              ['^.+\\.module.s?css$', '^.+\\.s?css$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
