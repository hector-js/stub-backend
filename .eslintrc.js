module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    "no-tabs": ["error", {"allowIndentationTabs": true}],
    "object-curly-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "max-len": [2, {"code": 140, "tabWidth": 2, "ignoreUrls": true}]
  },
};
