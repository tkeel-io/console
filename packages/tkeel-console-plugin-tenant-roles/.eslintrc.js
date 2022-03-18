module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['../../eslint/javascript.js'],
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: '../../eslint/typescript-react',
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
};
