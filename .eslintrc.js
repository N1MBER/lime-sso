module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
  env: {
    browser: true,
    es2020: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/require-extension': 'off',
    'import/extensions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        packageDir: './',
      },
    ],
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-cycle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'no-useless-return': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/state-in-constructor': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'socket', 'button'],
      },
    ],
    'react/require-default-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_retry'],
      },
    ],
    'spaced-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['snake_case', 'camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
