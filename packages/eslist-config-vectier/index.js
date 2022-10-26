module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error', 'ignorePackages', { '': 'never' },
    ],

    'import/prefer-default-export': 'off',
    'padded-blocks': [
      'error', { 'classes': 'always' },
    ],

    'no-console': 'off',
    'class-methods-use-this': 'off',
  },
};
