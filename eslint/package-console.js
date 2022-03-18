module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['./javascript'],
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: './typescript-react',
    },
  ],
};
