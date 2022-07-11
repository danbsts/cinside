module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
    'sort-destructure-keys',
  ],
  rules: {
    camelcase: [
      'error',
      {
        allow: ['__UNSAFE$'],
      },
    ],
    'import/no-unresolved': 'off',
    'linebreak-style': ['error', 'unix'],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    'react/prop-types': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      {
        caseSensitive: true,
      },
    ],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
      },
    ],
    'sort-keys': [
      'error',
      'asc',
    ],
  },
};
