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
    // Fix path mapping issue
    'import/extensions': [
      'error', 'ignorePackages', { '': 'never' },
    ],

    // Prefer named exports
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Prefer explicit return type
    '@typescript-eslint/explicit-function-return-type': 'error',

    // Coding styles
    'padded-blocks': [
      'error', { 'classes': 'always' },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],

    'class-methods-use-this': 'off',
  },
};
