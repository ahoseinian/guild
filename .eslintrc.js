module.exports = {
  'rules': {
    'indent': [
      2,
      2
    ],
    'quotes': [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': 2,
    'comma-dangle': [0, 'always-multiline'],
    'no-console': 1
  },
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': 'eslint:recommended',

  'plugins': [
    'react'
  ],
  'globals': {
    'document': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true,
      'jsx': true,
      'experimentalObjectRestSpread': true
    },
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"]
};
