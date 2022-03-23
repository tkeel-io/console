module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    'shared-node-browser': true,
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true,
  },
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    'no-useless-call': 'error',
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
          'type',
          'unknown',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
};
