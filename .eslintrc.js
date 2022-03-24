module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    '@typescript-eslint/return-await': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'max-len': 'off',
  },
  overrides: [
    {
      files: [],
      rules: {
        'import/no-cycle': 'off',
      },
    },
  ],
};
