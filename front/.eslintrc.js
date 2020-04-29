module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": [2, "double", { "avoidEscape": true }],
    "comma-dangle": ["error", "never"],
    "no-param-reassign": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "import/no-dynamic-require": 0,
    "max-len": ["error", { "code": 150 }],
    "operator-linebreak": 0,
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "no-nested-ternary": 0,
    "no-return-assign": 0,
    "consistent-return": 0,
    "eol-last": 0
  },
};
