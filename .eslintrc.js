module.exports = {
  extends: ['8select'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': ['off'],
    'react/display-name': ['off'],
    'no-unused-vars': ['warn'],
    'flow-check/check': ['off'],
  },
}
