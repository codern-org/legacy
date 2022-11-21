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

    // Fix decorator and type union buggy
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        "ignoredNodes": [
          "FunctionExpression > .params[decorators.length > 0]",
          "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
          "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key",
        ],
      },
    ],

    'class-methods-use-this': 'off',
  },
};
