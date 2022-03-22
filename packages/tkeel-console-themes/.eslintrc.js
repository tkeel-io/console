module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['../../eslint/javascript'],
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: '../../eslint/typescript-react',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
