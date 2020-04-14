module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  extends: ['airbnb-typescript', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    commonjs: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/static-property-placement': 'off',
    'import/prefer-default-export': 'off',
    'no-prototype-builtins': 'off',
    'no-console': 'off'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      'babel-module': {}
    }
  },
}
