module.exports = {
  ...require('prettier-airbnb-config'),
  printWidth: 100,
  arrowParens: 'always',
  bracketSpacing: true,
  trailingComma: 'all',
  rules: {
    'linebreak-style': 0,
    'no-use-before-define': ['error', 'nofunc'],
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle' :'off'
  },
};
