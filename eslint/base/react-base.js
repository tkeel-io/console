module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
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
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__POWERED_BY_QIANKUN__',
          '__INJECTED_PUBLIC_PATH_BY_QIANKUN__',
        ],
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
  },
};
