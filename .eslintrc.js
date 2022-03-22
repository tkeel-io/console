module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.js'],
      extends: './eslint/javascript',
    },
    {
      files: ['**/*.ts'],
      extends: './eslint/typescript',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
